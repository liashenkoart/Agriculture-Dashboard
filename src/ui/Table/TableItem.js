import React, { useState, useContext, useRef } from "react"

import "./TableItem.css"

import { ArrowRightOutlined, ArrowDropDownOutlined } from "@material-ui/icons"

import EditControls from "./EditControls"
import DeleteControls from "./DeleteControls"

import TableContext from "./TableContext"

import FileUploader from "react-firebase-file-uploader"
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton"

function TableItem(props) {
    //
    const {
        rowData = {},
        fields = [],
        metaFields = [],
        children,
        formOnly = false,
        onAccept = () => null,
        onClose = () => null,
    } = props

    // data state
    const formData = {}
    for (let field of fields) if (field.form) formData[field.propName] = rowData[field.propName] || ""
    for (let metaField of metaFields)
        if (metaField.form) formData[metaField.propName] = rowData[metaField.propName] || ""

    const [state, setState] = useState(formData)

    // const [open, toggle] = useState(true)
    const [open, toggle] = useState(formOnly)
    const [isEditable, setIsEditable] = useState(formOnly)
    const [isDeletable, setIsDeletable] = useState(false)

    const { onRowUpdate, onRowDelete } = useContext(TableContext)

    // file uploader reference
    const fileUploaderRef = useRef(null)

    // handle changes inside input
    function handleFormInputChange(propName, value) {
        setState({ ...state, [propName]: value })
    }

    function handleItemClick() {
        toggle(!open)
    }

    function handleItemEditPress() {
        setIsEditable(true)
        setIsDeletable(false)
        toggle(true)
    }

    function handleItemDeletePress() {
        if (!formOnly) {
            setIsDeletable(true)
            setIsEditable(false)
            toggle(false)
        }
    }

    // pass row config options for any available field
    const rowOptions = {
        toggleEdit: handleItemEditPress,
        toggleDelete: handleItemDeletePress,
    }

    function handleRowDelete() {}

    function handleRowUpdate() {
        setIsEditable(false)
        toggle(false)
        if (formOnly) {
            onAccept({ ...state }, rowData)
        } else {
            onRowUpdate({ ...state }, rowData)
        }
    }

    function handleBothClose() {
        toggle(false)
        if (!formOnly) {
            setIsEditable(false)
            setIsDeletable(false)
        } else {
            onClose()
        }
    }

    // set focus on first form item
    let focusIndex = -1

    return (
        <>
            {/* <tr className={`table-item`}> */}
            <tr className={`table-item ${open ? "active" : ""} ${isEditable ? "on-edit" : ""}`}>
                {fields &&
                    fields.map((field, index) => {
                        // individual field
                        const {
                            render,
                            component: Component,
                            headerStyle,
                            style,
                            className = "",
                            toggler = false,
                        } = field

                        // find first form item
                        if (field.form && focusIndex < 0) focusIndex = index

                        return (
                            <td
                                key={`${rowData.uuid}_${field.propName}_${index}`}
                                className={`${className} ${!isEditable && !isDeletable && toggler ? "toggler" : ""} ${
                                    !field.editField && isEditable && !field.form ? "blur" : ""
                                }`}
                                style={{
                                    ...(style || headerStyle),
                                    justifyContent:
                                        field.form && isEditable
                                            ? "flex-start"
                                            : style || headerStyle
                                            ? (style || headerStyle).justifyContent
                                            : "initial",
                                }}
                                {...{ onClick: !isEditable && !isDeletable && toggler ? handleItemClick : undefined }}
                            >
                                {!isEditable && toggler && !open && <ArrowRightOutlined />}
                                {!isEditable && toggler && open && <ArrowDropDownOutlined />}
                                {field.deleteField && isDeletable ? (
                                    <DeleteControls onClose={handleBothClose} onDelete={() => onRowDelete(rowData)} />
                                ) : field.editField && isEditable ? (
                                    <EditControls onClose={handleBothClose} onAccept={handleRowUpdate} />
                                ) : field.form && field.type === "string" && isEditable ? (
                                    <div className="table-item__field-input">
                                        <input
                                            type="text"
                                            autoFocus={index === focusIndex}
                                            placeholder={field.displayName}
                                            value={state[field.propName]}
                                            onChange={(e) => handleFormInputChange(field.propName, e.target.value)}
                                        />
                                    </div>
                                ) : field.form && field.type === "file" && isEditable ? (
                                    <div className="table-item__field-input">
                                        <input
                                            type="file"
                                            multiple={false}
                                            onChange={(e) => handleFormInputChange(field.propName, e.target.files[0])}
                                            accept={".kml,.geojson,.zip"}
                                            // ref={fileUploaderRef}
                                            // storageRef={field.storageRef || null}
                                            // onUploadSuccess={(filename) => props.onChange(filename)}
                                        />
                                    </div>
                                ) : (
                                    (render && render(rowData[field.propName], rowData, rowOptions)) ||
                                    (Component && (
                                        <Component
                                            fieldData={rowData[field.propName]}
                                            rowData={rowData}
                                            rowOptions={rowOptions}
                                            propName={field.propName}
                                        />
                                    )) ||
                                    rowData[field.propName]
                                )}
                            </td>
                        )
                    })}
            </tr>
            {/* Table Meta Item */}
            {open &&
                (children || (
                    <tr>
                        <td className={`table-item-meta-data ${isEditable ? "edit" : ""}`}>
                            {metaFields.map((metaField, index) => {
                                return (
                                    <>
                                        <div
                                            className="table-item-meta-data__field"
                                            key={`${rowData.uuid}_${metaField.propName}_editable_${index}`}
                                        >
                                            <strong>{metaField.displayName}: </strong>
                                            {isEditable && metaField.form && metaField.type === "string" ? (
                                                <input
                                                    type="text"
                                                    placeholder={metaField.displayName}
                                                    value={state[metaField.propName]}
                                                    onChange={(e) =>
                                                        handleFormInputChange(metaField.propName, e.target.value)
                                                    }
                                                />
                                            ) : (
                                                rowData[metaField.propName] || "N/A"
                                            )}
                                        </div>
                                    </>
                                )
                            })}
                        </td>
                    </tr>
                ))}
        </>
    )
}

export default React.memo(TableItem)
