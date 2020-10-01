import React from "react"

import "./TableContent.css"

import TableHeaders from "./TableHeaders"

import TableItem from "./TableItem"

import { applyFieldTransformation } from "../../helpers/table"

function TableContent(props) {
    const {
        displayData = [],
        fields = [],
        metaFields = [],
        rows,
        currentPage,
        orderBy = [],
        groupBy = [],
        asc,
        onHeaderClick,
        root,
    } = props

    let currentFields = [...fields]
    let nextFields = []

    if (groupBy && groupBy.length) {
        for (let field of fields) {
            // check if field is the selected one
            // check if current fields === 0 because you can only group data by one field at a time
            let currentlyGroupedBy = field.propName === groupBy[0].propName ? field : null

            if (currentlyGroupedBy && !currentlyGroupedBy.groupFields) {
                // if currently grouped by has special fields
                currentFields = [currentlyGroupedBy]
            } else if (currentlyGroupedBy && currentlyGroupedBy.groupFields) {
                // if currently grouped by doesn't have special filds
                currentFields = [...currentlyGroupedBy.groupFields]
            } else {
                // if it's any other field
                nextFields.push(field)
            }
        }
    }

    // to be used for nested children
    const _HeadersContainer = root
        ? ({ children }) => <thead>{children}</thead>
        : ({ children }) => <React.Fragment>{children}</React.Fragment>

    const _DataContainer = root
        ? ({ children }) => <tbody>{children}</tbody>
        : ({ children }) => <React.Fragment>{children}</React.Fragment>

    let transformedData = applyFieldTransformation(displayData, currentFields)
    if (root) transformedData = transformedData.slice(rows * currentPage - rows, rows * currentPage)

    return (
        <>
            {(root || groupBy.length === 0) && (
                <_HeadersContainer>
                    <tr>
                        {currentFields &&
                            currentFields.map((field, i) => {
                                const {
                                    propName,
                                    displayName,
                                    headerClassName,
                                    headerStyle,
                                    style,
                                    sortable,
                                    draggable,
                                } = field
                                // TODO notify on click
                                return (
                                    <TableHeaders
                                        key={`field_${propName}_${i}`}
                                        propName={propName}
                                        active={propName === orderBy}
                                        asc={asc}
                                        displayName={displayName}
                                        className={headerClassName}
                                        style={headerStyle || style}
                                        onClick={onHeaderClick}
                                        draggable={draggable}
                                        // onDragStart={() => (currentDraggedHeader = { propName, displayName })}
                                        // onDragEnd={() => (currentDraggedHeader = null)}
                                        sortable={sortable}
                                    />
                                )
                            })}
                    </tr>
                </_HeadersContainer>
            )}
            <_DataContainer>
                {(transformedData &&
                    transformedData.length > 0 &&
                    transformedData.map((rowData, index) => {
                        // if tableitem has data, arrange it and render it
                        return (
                            <TableItem
                                key={`${rowData.uuid}_${index}`}
                                rowData={rowData}
                                fields={currentFields}
                                metaFields={metaFields}
                            >
                                {groupBy.length > 0 ? (
                                    <tr className="nested-table__container">
                                        <td colSpan={nextFields.length} className="nested-table">
                                            <table className="table__content">
                                                <tbody>
                                                    <TableContent
                                                        displayData={rowData.data}
                                                        fields={nextFields}
                                                        metaFields={metaFields}
                                                        groupBy={groupBy.slice(1, groupBy.length)} // next group
                                                    />
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                ) : null}
                            </TableItem>
                        )
                    })) || (
                    <tr style={{ paddingLeft: "20px" }}>
                        <td className="table__content__default-message" colSpan={currentFields.length}>
                            No records to display
                        </td>
                    </tr>
                )}
            </_DataContainer>
        </>
    )
}

export default React.memo(TableContent)
