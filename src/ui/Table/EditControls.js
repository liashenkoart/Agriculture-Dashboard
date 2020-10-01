import React from "react"

import "./EditControls.css"

import CheckIcon from "../Icons/CheckIcon"
import CancelIcon from "../Icons/CancelIcon"

function EditControls(props) {
    const { onClose = () => null, onAccept = () => null } = props

    return (
        <>
            <button className="table-item-editable__actions__button" onClick={onAccept}>
                <CheckIcon fill="#1F9992" />
            </button>
            <button className="table-item-editable__actions__button" onClick={onClose}>
                <CancelIcon />
            </button>
        </>
    )
}

export default EditControls
