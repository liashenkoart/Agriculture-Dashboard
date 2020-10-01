import React from "react"

function CheckAltIcon(props) {
    const { fill } = props

    return (
        <>
            <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6.27427 12.3159L2.0451 8.08677C1.57385 7.61552 0.824687 7.61552 0.353438 8.08677C-0.117812 8.55802 -0.117812 9.30719 0.353438 9.77844L5.41635 14.8414C5.8876 15.3126 6.64885 15.3126 7.1201 14.8414L19.9284 2.0451C20.3997 1.57385 20.3997 0.824687 19.9284 0.353437C19.4572 -0.117812 18.708 -0.117812 18.2368 0.353437L6.27427 12.3159Z"
                    fill={fill || "#1F9992"}
                />
            </svg>
        </>
    )
}

export default CheckAltIcon
