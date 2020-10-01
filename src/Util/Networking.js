import axios from "axios"
import config from "./config"
const REST_END_POINT = config.backend_server
function baseAxios(options) {
    const defaultHeaders = {
        "Content-Type": "application/json",
        "Accept-Language": options.language ? options.language : "en",
        lang: options.lang ? options.lang : "en",
        ...options.extraHeaders,
    }

    const baseUrl = REST_END_POINT
    return axios.create({
        baseURL: baseUrl,
        timeout: options.timeout || 30000,
        headers: defaultHeaders,
    })
}

function executeRequest(method, pathname, data, options = {}) {
    const body =
        method === "get" || !data
            ? {}
            : {
                  data,
              }
    const reqObj = {
        method,
        url: pathname,
        params: options.query,
        ...body,
    }
    const baseAxiosRequest = baseAxios(options)
    return new Promise((resolve, reject) => {
        return baseAxiosRequest
            .request(reqObj)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log("Axios", error.response)
                reject(error)
            })
    })
}

export default {
    get(pathname, options) {
        console.log("BaseApi", options)
        return executeRequest("get", pathname, null, options)
    },

    post(pathname, data, options) {
        return executeRequest("post", pathname, data, options)
    },

    put(pathname, data, options) {
        return executeRequest("put", pathname, data, options)
    },

    delete(pathname, data, options) {
        return executeRequest("delete", pathname, data, options)
    },

    all(promises) {
        return axios.all(promises)
    },
}
