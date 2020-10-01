import React, { useState } from "react"

import { FirstPage, LastPage, ChevronLeft, ChevronRight, ArrowRight } from "@material-ui/icons"

import "./TablePagination.css"

function TablePagination(props) {
    // ie. dataLength = 100, rows = 10, currentPage = 5
    const {
        rowList = [],
        rows = 0,
        currentPage = 0,
        dataLength = 0,
        onRowNumberChange = () => null,
        onCurrentPageChange = () => null,
    } = props

    const [isIndicatorActive, setIndicatorActive] = useState(false)

    function handleIndicatorButtonClick() {
        setIndicatorActive(!isIndicatorActive)
    }

    function handleRowChange(rowNumber) {
        if (rows !== rowNumber) {
            onRowNumberChange(rowNumber)
            setIndicatorActive(false)
        }
    }

    return (
        <>
            <div className="pagination">
                <div className={`pagination__indicator ${(isIndicatorActive && "active") || ""}`}>
                    <div className="pagination__indicator__current-value">
                        {rows} rows
                        <button
                            className="pagination__indicator__current-value__button"
                            onClick={handleIndicatorButtonClick}
                        >
                            <ArrowRight />
                        </button>
                    </div>
                    <div className="pagination__indicator__row-list">
                        {rowList.map((rowNumber) => (
                            <div
                                key={`pagination-row_${rowNumber}`}
                                onClick={() => handleRowChange(rowNumber)}
                                className="pagination__indicator__row-list__item"
                            >
                                {rowNumber} rows
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pagination__controls">
                    <button
                        className={`pagination__controls__button first-page ${(currentPage !== 1 && "active") || ""}`}
                        onClick={() => {
                            onCurrentPageChange(1)
                        }}
                    >
                        <FirstPage fontSize="inherit" />
                    </button>
                    <button
                        className={`pagination__controls__button past-page ${(currentPage !== 1 && "active") || ""}`}
                        onClick={() => {
                            onCurrentPageChange(currentPage - 1 <= 0 ? currentPage : currentPage - 1)
                        }}
                    >
                        <ChevronLeft fontSize="inherit" />
                    </button>
                    <label className="pagination__controls__label">
                        {currentPage * rows - (rows - 1)} -{" "}
                        {currentPage * rows > dataLength ? dataLength : currentPage * rows} of {dataLength}
                    </label>
                    <button
                        className={`pagination__controls__button next-page ${
                            (currentPage !== Math.ceil(dataLength / rows) && "active") || ""
                        }`}
                        onClick={() => {
                            onCurrentPageChange(
                                (currentPage + 1) * rows - rows < dataLength ? currentPage + 1 : currentPage
                            )
                        }}
                    >
                        <ChevronRight fontSize="inherit" />
                    </button>
                    <button
                        className={`pagination__controls__button next-page ${
                            (currentPage !== Math.ceil(dataLength / rows) && "active") || ""
                        }`}
                        onClick={() => {
                            onCurrentPageChange(Math.ceil(dataLength / rows))
                        }}
                    >
                        <LastPage fontSize="inherit" />
                    </button>
                </div>
                {/* <select className="pagination__indicator">
                    {[5, 10, 20].map((rowValue, index) => (
                        <option key={`row-value_${index}`} value={rowValue}>
                            {rowValue} rows
                        </option>
                    ))}
                </select> */}
            </div>
        </>
    )
}

export default TablePagination
