import React from "react"

function EditIcon(props) {
    const { fill } = props
    return (
        <>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0 8.70865V11H2.29135L9.0493 4.24205L6.75795 1.9507L0 8.70865ZM10.8213 2.47007C11.0596 2.23177 11.0596 1.84683 10.8213 1.60853L9.39147 0.178725C9.15317 -0.0595751 8.76823 -0.0595751 8.52993 0.178725L7.41175 1.2969L9.7031 3.58825L10.8213 2.47007Z"
                    fill={fill || "#1F9992"}
                />
            </svg>
        </>
    )
}

export default EditIcon
