import React, { useState, useContext } from "react"

import "./TableItemEditable.css"

import FileUploader from "react-firebase-file-uploader"

import CancelIcon from "../Icons/CancelIcon"
// import CheckAltIcon from "../Icons/CheckAltIcon"
import TrashIcon from "../Icons/TrashIcon"

function TableItemDeletable(props) {
    //
    const {
        rowData = {},
        rowOptions,
        fields = [],
        onTrashButtonPress = () => null,
        onCloseButtonPress = () => null,
    } = props

    // send state to upper component
    function handleTrashButtonPress() {
        onTrashButtonPress(rowData)
    }

    //
    return (
        <>
            {/* <tr className={`table-item`}> */}
            <tr className="table-item">
                {fields &&
                    fields
                        .filter((field) => field.form)
                        .map((field, index) => {
                            // individual field

                            const {
                                render,
                                component: Component,
                                headerStyle,
                                style,
                                className = "",
                                toggler = false,
                            } = field

                            return (
                                <td
                                    key={`${rowData.uuid}_${field.propName}_editable_${index}`}
                                    className="table-item-editable"
                                >
                                    {(render && render(rowData[field.propName], rowData, rowOptions)) ||
                                        (Component && (
                                            <Component
                                                fieldData={rowData[field.propName]}
                                                rowData={rowData}
                                                propName={field.propName}
                                            />
                                        )) ||
                                        rowData[field.propName]}
                                </td>
                            )
                        })}
                <td className="table-item-editable__actions">
                    <button className="table-item-editable__actions__button" onClick={handleTrashButtonPress}>
                        <TrashIcon fill="#FF3D3D" />
                    </button>
                    <button className="table-item-editable__actions__button" onClick={onCloseButtonPress}>
                        <CancelIcon />
                    </button>
                </td>
            </tr>
        </>
    )
}

export default TableItemDeletable
