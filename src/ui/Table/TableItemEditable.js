import React, { useState, useContext } from "react"

import "./TableItemEditable.css"

import FileUploader from "react-firebase-file-uploader"

import CancelIcon from "../Icons/CancelIcon"
// import CheckAltIcon from "../Icons/CheckAltIcon"
import CheckIcon from "../Icons/CheckIcon"

function TableItemEditable(props) {
    //
    const { rowData = {}, fields = [], onCheckButtonPress = () => null, onCloseButtonPress = () => null } = props

    // manage only the form data
    const formData = {}
    for (let field of fields) if (field.form) formData[field.propName] = rowData[field.propName] || ""
    //
    const [state, setState] = useState(formData)

    function handleFormInputChange(propName, value) {
        setState({ ...state, [propName]: value })
    }

    // send state to upper component
    function handleCheckButtonPress() {
        onCheckButtonPress({ uuid: rowData.uuid, ...state })
    }

    //
    return (
        <>
            {/* <tr className={`table-item`}> */}
            <tr className="table-item">
                {fields &&
                    fields
                        .filter((field) => field && field.form)
                        .map((field, index) => {
                            // individual field
                            const { className = "" } = field

                            return (
                                <td
                                    key={`${rowData.uuid}_${field.propName}_editable_${index}`}
                                    className="table-item-editable"
                                >
                                    {field.displayName && (
                                        <div className="table-item-editable__field-name">{field.displayName}:</div>
                                    )}
                                    <div className="table-item-editable__field-input">
                                        {field.type && field.type === "string" ? (
                                            <input
                                                type="text"
                                                placeholder={field.displayName}
                                                value={state[field.propName]}
                                                onChange={(e) => {
                                                    //
                                                    handleFormInputChange(field.propName, e.target.value)
                                                }}
                                            />
                                        ) : field.type === "file" ? (
                                            <FileUploader />
                                        ) : null}
                                    </div>
                                </td>
                            )
                        })}
                <td className="table-item-editable__actions">
                    <button className="table-item-editable__actions__button" onClick={handleCheckButtonPress}>
                        <CheckIcon fill="#1F9992" />
                    </button>
                    <button className="table-item-editable__actions__button" onClick={onCloseButtonPress}>
                        <CancelIcon />
                    </button>
                </td>
            </tr>
        </>
    )
}

export default TableItemEditable
