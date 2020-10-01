import React from "react"

function WarningIcon(props) {
    const { fill } = props
    return (
        <>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM8 8.8C7.56 8.8 7.2 8.44 7.2 8V4.8C7.2 4.36 7.56 4 8 4C8.44 4 8.8 4.36 8.8 4.8V8C8.8 8.44 8.44 8.8 8 8.8ZM8.8 12H7.2V10.4H8.8V12Z"
                    fill={fill || "#FFBD3D"}
                />
            </svg>
        </>
    )
}

export default WarningIcon
