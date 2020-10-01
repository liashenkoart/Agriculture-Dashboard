import React from "react"

// import generic style
import "../index.css"

import Table from "../ui/table/Table"

import { Check, ErrorOutlined } from "@material-ui/icons" // TODO change for new icons

const { data: tableData } = require("./table_data.json")

export default {
    title: "Table Stories",
}

/**
 * Configuration:
 *
 * propName: String
 * displayName: String
 * className: String
 * style: StyleObject
 * headerStyle: StyleObject
 * transform: (value, rowData) => value // >> before data arrangement
 * render: (value, rowData) => JSX
 * toggler: Boolean // press to render children? "name" propr i.e.
 * group: () => {}
 *
 */

const cropTableConfig = [
    {
        propName: "alert",
        displayName: "",
        style: { justifyContent: "center" },
        headerStyle: { justifyContent: "center" },
        render: (_, rowData) => {
            return <div className="alert-dot" />
        },
        sortable: false,
    },
    {
        propName: "name",
        displayName: "Name",
        style: { flex: 2 },
        headerStyle: { flex: 2, justifyContent: "center" },
        toggler: true,
        draggable: true,
    },
    {
        propName: "crop",
        displayName: "Crop",
        draggable: true,
        groupFields: [
            {
                propName: "crop",
                displayName: "Crop",
                toggler: true,
                render(value, rowData) {
                    return "Crop: " + value
                },
            },
        ],
    },
    {
        propName: "region",
        displayName: "Region",
        style: { flex: 3 },
        headerStyle: { flex: 3 },
        draggable: true,
        groupFields: [
            {
                propName: "alert",
                displayName: "",
                style: { justifyContent: "center", flex: 1 },
                headerStyle: { justifyContent: "center", width: "50px" },
                render: (_, rowData) => {
                    return <div className="alert-dot" />
                },
                sortable: false,
            },
            {
                propName: "region",
                displayName: "",
                toggler: true,
                style: { flex: 4 },
                render(value, rowData) {
                    return "Region: " + value
                },
            },
            {
                propName: "avgPlantDate",
                displayName: "Average Plant Date",
                style: { flex: 2 },
                transform(value, rowData) {
                    return "11/07/2020"
                },
            },
            {
                propName: "medianStage",
                displayName: "Median Stage",
                style: { flex: 2 },
                transform(value, rowData) {
                    return "Canopy Closure"
                },
            },
            {
                propName: "avgYield",
                displayName: "Average Yield",
                style: { flex: 2 },
                transform(value, rowData) {
                    return "200 tn/ha"
                },
            },
            {
                propName: "rep-button",
                displayName: "",
                style: { flex: 2 },
                transform(value, rowData) {
                    return "View Report"
                },
            },
        ],
    },
    {
        propName: "weatherfile",
        displayName: "Weather File",
        headerStyle: { display: "flex", justifyContent: "center", alignItems: "center" },
        style: { display: "flex", justifyContent: "center", alignItems: "center" },
        render: (value, obj) => {
            return (
                <div className="weather-file">
                    <ErrorOutlined fontSize="inherit" />
                </div>
            )
        },
        sortable: false,
    },
    {
        propName: "shapefile",
        displayName: "Shape File",
        headerStyle: { display: "flex", justifyContent: "center", alignItems: "center" },
        style: { display: "flex", justifyContent: "center", alignItems: "center" },
        render: () => {
            return <div className="shape-file"></div>
        },
        sortable: false,
    },

    {
        displayName: "Action",
        sortable: false,
    },
]

export function BasicTableStory() {
    return (
        <>
            <div style={{ padding: 20 }}>
                <Table title="Field List" data={tableData} fields={cropTableConfig} />
            </div>
        </>
    )
}

BasicTableStory.story = {
    name: "Basic Table",
}
