import React from "react"

import "./SimpleButton.css"

function SimpleButton(props) {
    const { onClick = () => null, className = "", style, children } = props
    return (
        <>
            <button className="simple-button" style={{ ...style }} onClick={onClick}>
                {children}
            </button>
        </>
    )
}

export default SimpleButton
