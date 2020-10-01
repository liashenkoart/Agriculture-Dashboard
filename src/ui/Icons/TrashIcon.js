import React from "react"

function TrashIcon(props) {
    const { fill } = props
    return (
        <>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                    <path
                        d="M4.25002 13.4583C4.25002 14.2375 4.88752 14.875 5.66669 14.875H11.3334C12.1125 14.875 12.75 14.2375 12.75 13.4583V4.95833H4.25002V13.4583ZM13.4584 2.83333H10.9792L10.2709 2.125H6.72919L6.02085 2.83333H3.54169V4.25H13.4584V2.83333Z"
                        fill={fill || "#1F9992"}
                    />
                </g>
            </svg>
        </>
    )
}

export default TrashIcon
