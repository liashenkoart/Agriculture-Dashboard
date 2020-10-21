import React, { useContext, useEffect, useState } from "react"

import { useHistory } from "react-router-dom"
import app from "../../Util/Fire"

import "./CropTable.css"

import Table from "../../ui/Table/Table"
import SimpleButton from "../../ui/Button/SimpleButton"
import {
    getTableData,
    addTableRow,
    updateTableRow,
    deleteTableRow,
    uploadFile,
    getFileUrl,
} from "../../services/table.service"

import AgronomicAlertIcon from "../../ui/Icons/AgronomicAlertIcon"
import VisibilityIcon from "../../ui/Icons/VisibilityIcon"
import EditIcon from "../../ui/Icons/EditIcon"
import TrashIcon from "../../ui/Icons/TrashIcon"
import CheckIcon from "../../ui/Icons/CheckIcon"
import WarningIcon from "../../ui/Icons/WarningIcon"

import swal from "sweetalert"

// Table fields
import {
    alertField,
    nameField,
    cropField,
    varietyField,
    regionField,
    // weatherFileField,
    shapeFileField,
    actionField,
    deleteField,
    avgPlantDateField,
    medianStageField,
    avgYieldField,
} from "./tableFields"

// Table meta fields
import { plantingDateField, plantStageField, yieldForecastField, notesField, temperatureField } from "./tableMetaFields"
import { AuthContext } from "../../Auth/Auth"

function CropTable() {
    // field data
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const {permissions} = useContext(AuthContext);

    // get table data
    useEffect(() => {
        setLoading(true)
        getTableData()
            .then((data) => {
                setLoading(false)
                console.log(data)
                setData(data)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }, [])

    const cropTableFields = [
        // Alert Field
        {
            ...alertField,
            render() {
                // return <MeteorologicalAlertIcon />
                // return <SoilAlertIcon />
                return <AgronomicAlertIcon />
            },
        },
        // Name Field
        nameField,
        // Crop Field
        cropField,
        // Nice variety field
        varietyField,
        // Region Field
        {
            ...regionField,
            // Region Fields config when grouped
            groupFields: [
                // Alert Field (render changes)
                {
                    ...alertField,
                    render(_, rowData) {
                        return <AgronomicAlertIcon />
                    },
                },
                // Region Field (render changes)
                {
                    ...regionField,
                    displayName: "",
                    toggler: true,
                    draggable: false,
                    style: { flex: 4 },
                    headerStyle: { flex: 4 },
                    render(value, rowData) {
                        return (
                            <>
                                <strong>Region:</strong>
                                {value}
                            </>
                        )
                    },
                },
                // Region extra fields
                avgPlantDateField,
                medianStageField,
                avgYieldField,
                // Region view button
                {
                    propName: "report-button",
                    sortable: false,
                    displayName: "",
                    style: { flex: 2, display: "flex", justifyContent: "center", alignItems: "center" },
                    render(_, rowData) {
                        return (
                            <SimpleButton onClick={() => history.push("/regionAlerts/" + rowData.region)}>
                                View Report
                            </SimpleButton>
                        )
                    },
                },
            ],
        },
        // weatherFileField,
        {
            ...shapeFileField,
            // storageRef: app.storage().ref("Shape"),
            render(value, rowData) {
                return (
                    <>
                        <button
                            className="crop-table__icon-button"
                            onClick={async () => {
                                if (value) {
                                    const downloadURL = await getFileUrl("Shape", rowData.shapefile)
                                    window.open(downloadURL, "_blank")
                                }
                            }}
                        >
                            {value && value.length ? <CheckIcon /> : <WarningIcon />}
                        </button>
                    </>
                )
            },
        },
        {
            ...actionField,
            render(_, rowData, { toggleEdit }) {
                return (
                    <>
                        <button
                            className="crop-table__icon-button"
                            onClick={() => history.push("/"+permissions['default']+"/" + rowData.uuid)}
                        >
                            <VisibilityIcon />
                        </button>
                        <button className="crop-table__icon-button" onClick={() => toggleEdit()}>
                            <EditIcon />
                        </button>
                    </>
                )
            },
        },
        // Delete action field
        {
            ...deleteField,
            render(_, rowData, { toggleDelete }) {
                return (
                    <button className="crop-table__icon-button" onClick={() => toggleDelete()}>
                        <TrashIcon />
                    </button>
                )
            },
        },
    ]

    const cropTableMetaFields = [
        //
        plantingDateField,
        plantStageField,
        yieldForecastField,
        notesField,
        // temperatureField,
    ]

    async function handleRowAdd(rowData) {
        try {
            setLoading(true)

            // upload file to firebase
            if (rowData.shapefile instanceof File) rowData.shapefile = await uploadFile("Shape", rowData.shapefile)

            console.log(rowData.shapefile)

            await addTableRow(rowData)
            const _data = await getTableData()
            // re - poblate table
            setData(_data)
            setLoading(false)
            swal({ text: "Row added successfully", buttons: { cancel: "Close" }, icon: "success" })
        } catch {
            setLoading(false)
            swal({ text: "There was a problem, try again later!", buttons: { cancel: "Close" }, icon: "error" })
        }
    }

    async function handleRowUpdate(rowData, past) {
        try {
            setLoading(true)

            // upload file to firebase
            if (rowData.shapefile instanceof File) rowData.shapefile = await uploadFile("Shape", rowData.shapefile)

            console.log(rowData.shapefile)

            await updateTableRow(past.uuid, { ...past, ...rowData })
            const _data = await getTableData()
            //
            setData(_data)
            setLoading(false)
            swal({ text: "Row updated successfully!", buttons: { cancel: "Close" }, icon: "success" })
        } catch (e) {
            console.log(e)
            setLoading(false)
            swal({ text: "There was a problem, try again later!", buttons: { cancel: "Close" }, icon: "error" })
        }
    }

    async function handleRowDelete(rowData) {
        try {
            setLoading(true)
            await deleteTableRow(rowData.uuid)
            const _data = await getTableData()
            //
            setData(_data)
            setLoading(false)
            swal({ text: "Row deleted successfully!", buttons: { cancel: "Close" }, icon: "success" })
        } catch {
            setLoading(false)
            swal({ text: "There was a problem, try again later!", buttons: { cancel: "Close" }, icon: "error" })
        }
    }

    return (
        <>
            <Table
                title="Field List"
                // data
                data={data}
                fields={cropTableFields}
                metaFields={cropTableMetaFields}
                // handlers
                loading={loading}
                onRowAdd={handleRowAdd}
                onRowUpdate={handleRowUpdate}
                onRowDelete={handleRowDelete}
            />
        </>
    )
}

export default CropTable

// export default function MaterialTableDemo() {
//     const history = useHistory()
//     const [state, setState] = React.useState({
//         columns: [
//             {
//                 title: "Name",
//                 field: "name",
//                 headerStyle: {
//                     backgroundColor: "#219992",
//                 },
//             },
//             {
//                 title: "Crop",
//                 field: "crop",
//                 headerStyle: {
//                     backgroundColor: "#219992",
//                 },
//             },
//             // { title: 'Planting Date', field: 'plantingDate', type: 'date',headerStyle: {
//             //         backgroundColor: '#219992',
//             //     },
//             //     render: rowData => <text>{rowData.plantingDateP}</text>
//             // },
//             {
//                 title: "Region",
//                 field: "region",
//                 headerStyle: {
//                     backgroundColor: "#219992",
//                 },
//             },
//             // { title: 'Notes', field:'notes',headerStyle: {
//             //         backgroundColor: '#219992',
//             //     }},
//             {
//                 title: "Weather File",
//                 field: "weatherfile",
//                 emptyValue: "",
//                 headerStyle: {
//                     backgroundColor: "#219992",
//                 },
//                 render: (rowData) =>
//                     rowData.weatherfile === "" ? (
//                         <XIcon />
//                     ) : (
//                         <IconButton
//                             color="inherit"
//                             onClick={async () => {
//                                 console.log(rowData.weatherfile)
//                                 const downloadURL = await app
//                                     .storage()
//                                     .ref("Weather")
//                                     .child(rowData.weatherfile)
//                                     .getDownloadURL()
//                                 console.log(downloadURL)
//                                 window.open(downloadURL, "_blank")
//                             }}
//                         >
//                             <CheckIcon style={{ color: "#219992" }} />
//                         </IconButton>
//                     ),
//                 editComponent: (props) => (
//                     <FileUploader
//                         name="weatherfile"
//                         randomizeFilename
//                         storageRef={app.storage().ref("Weather")}
//                         onUploadSuccess={(filename) => props.onChange(filename)}
//                     />
//                 ),
//             },
//             {
//                 title: "Shape File",
//                 field: "shapefile",
//                 emptyValue: "",
//                 headerStyle: {
//                     backgroundColor: "#219992",
//                 },
//                 render: (rowData) =>
//                     rowData.shapefile === "" ? (
//                         <XIcon />
//                     ) : (
//                         <IconButton
//                             color="inherit"
//                             onClick={async () => {
//                                 console.log(rowData.shapefile)
//                                 const downloadURL = await app
//                                     .storage()
//                                     .ref("Shape")
//                                     .child(rowData.shapefile)
//                                     .getDownloadURL()
//                                 console.log(downloadURL)
//                                 window.open(downloadURL, "_blank")
//                             }}
//                         >
//                             <CheckIcon style={{ color: "#219992" }} />
//                         </IconButton>
//                     ),
//                 editComponent: (props) => (
//                     <FileUploader
//                         name="shapefile"
//                         randomizeFilename
//                         storageRef={app.storage().ref("Shape")}
//                         onUploadSuccess={(filename) => props.onChange(filename)}
//                         accept={".kml,.geojson"}
//                     />
//                 ),
//             },
//         ],
//         data: [],
//     })

//     const loadData = () => {
//         console.log("Loading Data")
//         console.log()
//         app.auth()
//             .currentUser.getIdToken()
//             .then((userToken) => {
//                 console.log(userToken)
//                 axios
//                     .get("https://dev.climate.ai/api/v1/fields/", { headers: { "User-Token": userToken } })
//                     .then((res) => res.data)
//                     .then((result) => {
//                         setState((prevState) => {
//                             const data = result.data
//                             return { ...prevState, data }
//                         })
//                     })
//                     .catch((error) => {
//                         console.log("FirstError")
//                         console.log(error)
//                     })
//             })
//             .catch((error) => {
//                 console.log("SecondError")
//                 console.log(error)
//             })
//     }

//     useEffect(() => {
//         loadData()
//     }, [])

//     /*    useEffect(()=> {
//         if(w){
//             /!*app.database()
//                 .ref("/"+app.auth().currentUser.uid)
//                 .set(state.data);*!/
//             console.log("DATA SAVED")
//         }
//         console.log('Save function called')
//     },[w,state.data]);*/

//     const normalizeDate = (date) => {
//         if (date == null) {
//             return ""
//         }
//         if (typeof date === "string") {
//             date = new Date(date)
//         }
//         const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : "" + (date.getMonth() + 1)
//         const day = date.getDate() < 10 ? "0" + date.getDate() : "" + date.getDate()
//         const year = date.getFullYear()
//         return month + "/" + day + "/" + year
//     }

//     return (
//         <MaterialTable
//             title="Field List"
//             components={{
//                 Row: (props) => {
//                     return <MTableBodyRow {...props} />
//                 },
//                 FilterRow: (props) => {
//                     return <MTableFilterRow {...props} />
//                 },
//             }}
//             columns={state.columns}
//             data={state.data}
//             icons={tableIcons}
//             options={{
//                 grouping: true,
//                 actionsColumnIndex: -1,
//                 headerStyle: {
//                     backgroundColor: "#219992",
//                     color: "#FFF",
//                 },
//                 rowStyle: (rowData) => ({
//                     backgroundColor: rowData.tableData.id % 2 ? "#EEE" : "#FFF",
//                 }),
//             }}
//             editable={{
//                 onRowAdd: (newData) =>
//                     new Promise((resolve) => {
//                         setTimeout(() => {
//                             resolve()
//                             app.auth()
//                                 .currentUser.getIdToken()
//                                 .then((userToken) => {
//                                     newData.plantingDateP = normalizeDate(newData.plantingDate)
//                                     axios
//                                         .post("https://dev.climate.ai/api/v1/fields/", newData, {
//                                             headers: { "User-Token": userToken },
//                                         })
//                                         .then((res) => res.data)
//                                         .then((result) => {
//                                             console.log(result)
//                                             if (result.status === 1) {
//                                                 loadData()
//                                             }
//                                         })
//                                         .catch((error) => {
//                                             console.log("FirstError")
//                                             console.log(error)
//                                         })
//                                 })
//                                 .catch((error) => {
//                                     console.log("SecondError")
//                                     console.log(error)
//                                 })
//                         }, 600)
//                     }),
//                 onRowUpdate: (newData, oldData) =>
//                     new Promise((resolve) => {
//                         setTimeout(() => {
//                             resolve()
//                             if (oldData) {
//                                 app.auth()
//                                     .currentUser.getIdToken()
//                                     .then((userToken) => {
//                                         newData.plantingDateP = normalizeDate(newData.plantingDate)
//                                         axios
//                                             .put("https://dev.climate.ai/api/v1/fields/" + oldData.uuid, newData, {
//                                                 headers: { "User-Token": userToken },
//                                             })
//                                             .then((res) => res.data)
//                                             .then((result) => {
//                                                 console.log(result)
//                                                 if (result.status === 1) {
//                                                     loadData()
//                                                 }
//                                             })
//                                             .catch((error) => {
//                                                 console.log("FirstError")
//                                                 console.log(error)
//                                             })
//                                     })
//                                     .catch((error) => {
//                                         console.log("SecondError")
//                                         console.log(error)
//                                     })
//                                 // setState(prevState => {
//                                 //     newData.plantingDateP = normalizeDate(newData.plantingDate);
//                                 //     const data = [...prevState.data];
//                                 //     data[data.indexOf(oldData)] = newData;
//                                 //     return { ...prevState, data };
//                                 // });
//                                 //setW((oldnum) => oldnum + 1);
//                             }
//                         }, 600)
//                     }),
//                 onRowDelete: (oldData) =>
//                     new Promise((resolve) => {
//                         setTimeout(() => {
//                             resolve()
//                             app.auth()
//                                 .currentUser.getIdToken()
//                                 .then((userToken) => {
//                                     axios
//                                         .delete("https://dev.climate.ai/api/v1/fields/" + oldData.uuid, {
//                                             headers: { "User-Token": userToken },
//                                         })
//                                         .then((res) => res.data)
//                                         .then((result) => {
//                                             console.log(result)
//                                             if (result.status === 1) {
//                                                 loadData()
//                                             }
//                                         })
//                                         .catch((error) => {
//                                             console.log("FirstError")
//                                             console.log(error)
//                                         })
//                                 })
//                                 .catch((error) => {
//                                     console.log("SecondError")
//                                     console.log(error)
//                                 })
//                             /*setState(prevState => {
//                                 const data = [...prevState.data];
//                                 data.splice(data.indexOf(oldData), 1);
//                                 return { ...prevState, data };
//                             });
//                             setW((oldnum) => oldnum + 1);*/
//                         }, 600)
//                     }),
//             }}
//             actions={[
//                 {
//                     icon: () => <VisibilityIcon style={{ color: "#219992" }} />,
//                     tooltip: "View Field Detail",
//                     onClick: (event, rowData) => {
//                         history.push("/general/" + rowData.uuid)
//                     },
//                 },
//             ]}
//             detailPanel={(rowData) => {
//                 return (
//                     <div
//                         style={{
//                             display: "flex",
//                             background: "rgba(19,20,20,.15)",
//                             alignItems: "center",
//                             justifyContent: "center",
//                         }}
//                     >
//                         <div style={{ display: "flex" }}>
//                             <div style={{ padding: 14, display: "flex" }}>
//                                 <p style={{ fontWeight: "bold" }}>{"Planting Date: "}</p>
//                                 <p>{rowData.plantingDateP}</p>
//                             </div>
//                             <div style={{ padding: 14, display: "flex" }}>
//                                 <p style={{ fontWeight: "bold" }}>{"Plant Stage: "}</p>
//                                 <p>{"Emergence"}</p>
//                             </div>
//                             <div style={{ padding: 14, display: "flex" }}>
//                                 <p style={{ fontWeight: "bold" }}>{"Yield Forecast: "}</p>
//                                 <p>{"200 tn/ha"}</p>
//                             </div>
//                             <div style={{ padding: 14, display: "flex" }}>
//                                 <p style={{ fontWeight: "bold" }}>{"Notes: "}</p>
//                                 <p>{rowData.notes}</p>
//                             </div>
//                         </div>
//                     </div>
//                 )
//             }}
//         />
//     )
// }
