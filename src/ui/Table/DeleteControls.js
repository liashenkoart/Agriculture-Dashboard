import React from "react"

import "./EditControls.css"

import TrashIcon from "../Icons/TrashIcon"
import CancelIcon from "../Icons/CancelIcon"

function DeleteControls(props) {
    const { onClose = () => null, onDelete = () => null } = props

    return (
        <>
            <button className="table-item-editable__actions__button" onClick={onDelete}>
                <TrashIcon fill="#FF3D3D" />
            </button>
            <button className="table-item-editable__actions__button" onClick={onClose}>
                <CancelIcon />
            </button>
        </>
    )
}

export default DeleteControls
