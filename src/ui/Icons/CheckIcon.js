import React from "react"

function CheckIcon(props) {
    const { fill } = props
    return (
        <>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM5.832 11.432L2.96 8.56C2.648 8.248 2.648 7.744 2.96 7.432C3.272 7.12 3.776 7.12 4.088 7.432L6.4 9.736L11.904 4.232C12.216 3.92 12.72 3.92 13.032 4.232C13.344 4.544 13.344 5.048 13.032 5.36L6.96 11.432C6.656 11.744 6.144 11.744 5.832 11.432Z"
                    fill={fill || "#22C11F"}
                />
            </svg>
        </>
    )
}

export default CheckIcon
