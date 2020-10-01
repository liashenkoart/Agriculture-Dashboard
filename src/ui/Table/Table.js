import React, { useState, useReducer, useRef, useEffect, useCallback } from "react"

import "./Table.css"

import { Search, Clear } from "@material-ui/icons"
import PlusIcon from "../Icons/PlusIcon"
import _ from "lodash"

import TableContent from "./TableContent"
import TableDraggableHeaders from "./TableDraggableHeaders"
import TablePagination from "./TablePagination"

//
import TableContext from "./TableContext"

// reducer
import TableReducer from "./TableReducer"

//
import { transformData } from "../../helpers/table"
import TableItemEditable from "./TableItemEditable"
import TableItem from "./TableItem"

const initialState = {
    // groupBy: [{ propName: "region", displayName: "Region" }],
    groupBy: [],
    orderBy: "",
    asc: true,
    inputValue: "",
    rows: 10,
    currentPage: 1,
}

function Table(props) {
    //
    const {
        title = "",
        fields = [],
        metaFields = [],
        data = [],
        loading = false,
        onRowAdd = () => null,
        onRowUpdate = () => null,
        onRowDelete = () => null,
        // itemComponent: ItemComponent = () => <React.Fragment />,
        // itemChildComponent: ItemChildComponent = () => <React.Fragment />,
    } = props

    // state
    const [state, dispatch] = useReducer(TableReducer, initialState)
    const { groupBy, orderBy, asc, inputValue, rows, currentPage } = state

    //
    const [showEditable, setEditable] = useState(false)

    // component did mount
    useEffect(() => {}, [])
    const inputRef = useRef(null)

    function handleHeaderClick(propName) {
        dispatch({
            type: "SET_ORDER_BY",
            payload: { orderBy: propName },
        })
    }

    // input handling
    const debounceInputChange = _.debounce((e) => {
        dispatch({ type: "INPUT_CHANGE", payload: { inputValue: e.target.value } })
    }, 500)
    const handleSearchBarInputChange = useCallback(
        (e) => {
            e.persist()
            debounceInputChange(e)
        },
        [debounceInputChange]
    )

    function handleSearchBarButtonClick(e) {
        dispatch({ type: "INPUT_CHANGE", payload: { inputValue: "" } })
        inputRef.current.value = ""
    }

    // draggable headers functionality
    function handleHeaderDrop(propData) {
        if (
            !groupBy.find(
                (_propData) =>
                    (propData && _propData && propData.propName === _propData.propName) ||
                    propData.displayName === _propData.displayName
            )
        )
            dispatch({ type: "ADD_GROUP_BY", payload: { ...propData } })
    }

    function handleHeaderClose(propData) {
        dispatch({ type: "REMOVE_GROUP_BY", payload: { ...propData } })
    }

    // pagination
    function handleRowNumberChange(_rows) {
        dispatch({ type: "ROW_NUMBER_CHANGE", payload: { rows: _rows } })
    }

    function handleCurrentPageChange(_page) {
        dispatch({ type: "CURRENT_PAGE_CHANGE", payload: { page: _page } })
    }

    function handleHeaderButtonPress() {
        setEditable(true)
    }

    function handleEditableCheck(_rowData) {
        onRowAdd(_rowData)
        setEditable(false)
    }

    function handleEditableClose() {
        setEditable(false)
    }

    let displayData = transformData(data, groupBy, orderBy, asc, inputValue, rows, currentPage, fields)

    return (
        <>
            <TableContext.Provider value={{ onRowAdd, onRowDelete, onRowUpdate }}>
                <div className="table">
                    <div className="table__container">
                        <div className="table__main-header">
                            <div className="table__main-header__title">
                                <button className="table__main-header__title__button" onClick={handleHeaderButtonPress}>
                                    <PlusIcon />
                                </button>
                                <h3 className="table__main-header__title__text">{title}</h3>
                            </div>
                            {/* TODO search bar */}
                            <div className="table__main-header__search-bar">
                                {/* TODO material icon */}
                                <Search />

                                <input
                                    ref={inputRef}
                                    type="text"
                                    className="table__main-header__search-bar__input"
                                    placeholder="Search"
                                    onChange={(e) => {
                                        e.persist()
                                        handleSearchBarInputChange(e)
                                    }}
                                />
                                {/* Erase button */}
                                <button
                                    className="table__main-header__search-bar__button"
                                    onClick={handleSearchBarButtonClick}
                                >
                                    <Clear />
                                </button>
                            </div>
                        </div>
                        {loading && <div className="table__loader" />}
                        <TableDraggableHeaders
                            groupBy={groupBy}
                            onDrop={handleHeaderDrop}
                            onHeaderClose={handleHeaderClose}
                        />
                        <table className="table__content root">
                            {showEditable ? (
                                <tbody className="table__content__new-item">
                                    <TableItem
                                        fields={fields}
                                        metaFields={metaFields}
                                        onClose={handleEditableClose}
                                        onAccept={handleEditableCheck}
                                        formOnly
                                    />
                                </tbody>
                            ) : null}
                            <TableContent
                                displayData={displayData}
                                fields={fields}
                                metaFields={metaFields}
                                rows={rows}
                                currentPage={currentPage}
                                orderBy={orderBy}
                                groupBy={groupBy}
                                asc={asc}
                                onHeaderClick={handleHeaderClick}
                                root
                            />
                        </table>
                    </div>
                    <div className="table__pagination">
                        <TablePagination
                            rowList={[5, 10, 20]}
                            rows={rows}
                            currentPage={currentPage}
                            dataLength={displayData.length}
                            onRowNumberChange={handleRowNumberChange}
                            onCurrentPageChange={handleCurrentPageChange}
                        />
                    </div>
                </div>
                {/* {displayData.map((item) => {
                return (
                    <React.Fragment key={item.uuid}>
                        {JSON.stringify(item)}
                        <br />
                        <br />
                    </React.Fragment>
                )
            })} */}
            </TableContext.Provider>
        </>
    )
}

export default React.memo(Table)
