import React from "react"

import { ArrowUpwardSharp, ArrowDownwardSharp } from "@material-ui/icons"

import "./TableHeaders.css"

function TableHeaders(props) {
    const {
        propName,
        active = false,
        asc = true,
        displayName,
        style,
        className,
        onClick = () => null,
        onDragEnd = () => null,
        sortable = false,
        draggable = false,
        paddingLeft,
    } = props

    function handleHeaderDragStart(e) {
        // pass dragged header data through the event
        e.dataTransfer.setData("draggable-header-prop-name", propName)
        e.dataTransfer.setData("draggable-header-display-name", displayName)
    }

    return (
        <>
            <th
                className={`table-header ${active ? "active" : ""} ${className || ""}`}
                style={style}
                draggable={draggable}
                onClick={() => sortable && onClick(propName)}
                onDragStart={handleHeaderDragStart}
                onDragEnd={onDragEnd}
            >
                {displayName}
                {sortable && (
                    <div className="table-header__icon">
                        {asc ? <ArrowUpwardSharp fontSize="inherit" /> : <ArrowDownwardSharp fontSize="inherit" />}
                    </div>
                )}
            </th>
        </>
    )
}

export default TableHeaders
