import React from "react"

import "./TableDraggableHeaders.css"

import { Close } from "@material-ui/icons"

function DraggableHeaders(props) {
    const { groupBy, onDrop, onHeaderClose } = props

    function handleDragOver(e) {
        e.preventDefault()
        e.nativeEvent.preventDefault()
    }

    function handleDrop(e) {
        const propName = e.dataTransfer.getData("draggable-header-prop-name")
        const displayName = e.dataTransfer.getData("draggable-header-display-name")
        onDrop({ propName, displayName })
    }

    return (
        <div className="table__draggable-headers" onDragOver={handleDragOver} onDrop={handleDrop}>
            {/* TODO nofity drag success */}
            {groupBy && groupBy.length > 0 ? (
                <>
                    <p className="table__draggable-headers__text">Grouped by:</p>
                    {groupBy.map((groupItem, propName) => {
                        const { displayName } = groupItem
                        return (
                            <div draggable="true" className="draggable-header" key={`draggable-header_${propName}`}>
                                {displayName}
                                <button
                                    className="draggable-header__button"
                                    onClick={() => onHeaderClose({ displayName, propName })} // handle close
                                >
                                    <Close fontSize="inherit" />
                                </button>
                            </div>
                        )
                    })}
                </>
            ) : (
                <p className="table__draggable-headers__text">Drag headers here to group by</p>
            )}
        </div>
    )
}

export default DraggableHeaders
