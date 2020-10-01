import axios from "axios"
import config from "../Util/config"
// firebase stuff
import { v4 as uuid } from "uuid"
import app from "../Util/Fire"

const hostDomain = config.backend_server

export async function getTableData() {
    return new Promise((resolve, _) => {
        app.auth()
            .currentUser.getIdToken()
            .then((userToken) => {
                axios
                    .get(hostDomain + "/api/v1/fields/", { headers: { "User-Token": userToken } })
                    .then(({ data: { data } }) => resolve(data.reverse()))
            })
    })
}

export async function addTableRow(rowData = {}) {
    return new Promise((resolve, _) => {
        app.auth()
            .currentUser.getIdToken()
            .then((userToken) => {
                axios
                    .post(hostDomain + "/api/v1/fields/", { ...rowData }, { headers: { "User-Token": userToken } })
                    .then((response) => resolve(response))
            })
    })
}

export async function updateTableRow(uuid, rowData) {
    //
    if (!uuid) throw new Error("Must provide the row uuid for the update to happen.")
    //
    return new Promise((resolve, _) => {
        app.auth()
            .currentUser.getIdToken()
            .then((userToken) => {
                axios
                    .put(
                        hostDomain + "/api/v1/fields/" + uuid,
                        { ...rowData },
                        { headers: { "User-Token": userToken } }
                    )
                    .then((response) => resolve(response))
            })
    })
}

export async function deleteTableRow(uuid) {
    //
    if (!uuid) throw new Error("Must provide the row uuid for the update to happen.")
    //
    return new Promise((resolve, _) => {
        app.auth()
            .currentUser.getIdToken()
            .then((userToken) => {
                axios
                    .delete(hostDomain + "/api/v1/fields/" + uuid, { headers: { "User-Token": userToken } })
                    .then((response) => resolve(response))
            })
    })
}

export async function uploadFile(ref, file) {
    // get extension
    const { name } = file
    const extension = name.split(".").pop()

    const fileName = uuid() + "." + extension

    // storage ref
    const storageRef = app.storage().ref(ref)

    // fileRef
    const fileRef = storageRef.child(fileName)
    const snapshot = await fileRef.put(file)

    console.log(snapshot)

    return fileName
}

export async function getFileUrl(ref, file) {
    console.log(file)
    return await app.storage().ref(ref).child(file).getDownloadURL()
}
