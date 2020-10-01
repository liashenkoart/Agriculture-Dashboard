import React from "react"

function SoilAlertIcon(props) {
    const { fill } = props

    return (
        <>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7" cy="7" r="7" fill={fill || "#1D2934"} />
                <path
                    d="M4 10C5.10457 10 6 9.10457 6 8C6 6.89543 5.10457 6 4 6C2.89543 6 2 6.89543 2 8C2 9.10457 2.89543 10 4 10Z"
                    fill="white"
                />
                <path
                    d="M9 11C9.55229 11 10 10.5523 10 10C10 9.44772 9.55229 9 9 9C8.44772 9 8 9.44772 8 10C8 10.5523 8.44772 11 9 11Z"
                    fill="white"
                />
                <path
                    d="M9 8C10.6569 8 12 6.65685 12 5C12 3.34315 10.6569 2 9 2C7.34315 2 6 3.34315 6 5C6 6.65685 7.34315 8 9 8Z"
                    fill="white"
                />
            </svg>
        </>
    )
}

export default SoilAlertIcon
