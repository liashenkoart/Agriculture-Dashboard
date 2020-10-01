import React from "react"

// Alert
export const alertField = {
    propName: "alert",
    displayName: "",
    style: { justifyContent: "center" },
    headerStyle: { justifyContent: "center" },
    sortable: false,
}

// Name
export const nameField = {
    propName: "name",
    displayName: "Name",
    style: { flex: 2 },
    headerStyle: { flex: 2 },
    toggler: true,
    draggable: true,
    sortable: true,
    form: true,
    type: "string",
}

// Crop
export const cropField = {
    propName: "crop",
    displayName: "Crop",
    draggable: true,
    sortable: true,
    form: true,
    type: "string",
    groupFields: [
        {
            propName: "crop",
            displayName: "Crop",
            toggler: true,
            render(value) {
                return "Crop: " + value
            },
        },
    ],
}

export const varietyField = {
    propName: "variety",
    displayName: "Variety",
    draggable: true,
    sortable: true,
    form: true,
    type: "string",
    groupFields: [
        {
            propName: "variety",
            displayName: "Variety",
            toggler: true,
            render(value) {
                return "Variety: " + value
            },
        },
    ],
}

export const avgPlantDateField = {
    propName: "avgPlantDate",
    displayName: "Average Plant Date",
    style: { flex: 2 },
    sortable: true,
    transform(value, rowData) {
        return "11/07/2020"
    },
}

export const medianStageField = {
    propName: "medianStage",
    displayName: "Median Stage",
    style: { flex: 2 },
    sortable: true,
    transform(value, rowData) {
        return "Canopy Closure"
    },
}

export const avgYieldField = {
    propName: "avgYield",
    displayName: "Average Yield",
    style: { flex: 2 },
    sortable: true,
    transform(value, rowData) {
        return "200 tn/ha"
    },
}

// Region
export const regionField = {
    propName: "region",
    displayName: "Region",
    style: { flex: 3 },
    headerStyle: { flex: 3 },
    draggable: true,
    sortable: true,
    form: true,
    type: "string",
}

// Weather File
export const weatherFileField = {
    propName: "weatherfile",
    displayName: "Weather File",
    headerStyle: { display: "flex", justifyContent: "center", alignItems: "center" },
    style: { display: "flex", justifyContent: "center", alignItems: "center" },
    render: (value, obj) => {
        return <div className="weather-file">{/* <ErrorOutlined fontSize="inherit" /> */}</div>
    },
}

// Shape File
export const shapeFileField = {
    propName: "shapefile",
    displayName: "Shape File",
    headerStyle: { display: "flex", justifyContent: "center", alignItems: "center" },
    style: { display: "flex", justifyContent: "center", alignItems: "center" },
    form: true,
    type: "file",
}

export const actionField = {
    editField: true,
    displayName: "Actions",
    headerStyle: { display: "flex", justifyContent: "center", alignItems: "center" },
    style: { display: "flex", justifyContent: "space-around", alignItems: "center" },
}

export const deleteField = {
    deleteField: true,
    displayName: "",
    headerStyle: { display: "flex", justifyContent: "center", alignItems: "center" },
    style: { display: "flex", justifyContent: "space-around", alignItems: "center" },
}
