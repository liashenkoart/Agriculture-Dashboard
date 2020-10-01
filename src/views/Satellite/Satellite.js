import React, { useContext, useEffect, useState } from "react"
// Import components
import { DailyForecast, GDDGraph, MapComponent } from "./components"
// Import from libraries
import { makeStyles } from "@material-ui/styles"
import { Grid } from "@material-ui/core"
import { useParams } from "react-router-dom"
import { convertGDDFromMetric } from "../../Util/UnitConversion"
import { SettingsContext } from "../../Util/SettingsContext"
import { AuthContext } from "../../Auth/Auth"

import networking from "../../Util/Networking"

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
}))

const Satellite = () => {
    const classes = useStyles()
    let { id } = useParams()
    const [gddData, setGDDData] = useState([])
    const [frostData, setFrostData] = useState([])
    const [firstFrostDate, setFirstFrostDate] = useState("")
    const [gddprediction, setGDDPredictionData] = useState([])
    const [ndvimapData, setndvimapData] = useState({})
    const [ndviData, setndviData] = useState([])
    const { currentUser } = useContext(AuthContext)
    const { currentSettings } = useContext(SettingsContext)
    const unitPreference = currentSettings.units

    useEffect(() => {
        if (currentUser !== null) {
            loadBasicNDVIData()
            loadNDVIMapData()
            loadGDDData()
            loadFrostDays()
            loadGDDPredictionData()
        }
    }, [currentUser])

    const loadNDVIMapData = () => {
        currentUser
            .getIdToken()
            .then((userToken) => {
                networking
                    .get("/api/v1/maps/ndvimap?uuid=" + id, { extraHeaders: { "User-Token": userToken } })
                    .then((res) => res.data)
                    .then((result) => {
                        setndvimapData(result)
                    })
                    .catch((error) => {
                        console.log("FirstError")
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log("SecondError")
                console.log(error)
            })
    }

    const loadFrostDays = () => {
        currentUser
            .getIdToken()
            .then((userToken) => {
                networking
                    .get("/api/v1/gdd/historicalfrost/" + id, { extraHeaders: { "User-Token": userToken } })
                    .then((res) => res.data)
                    .then((result) => {
                        let seasonfor = result["data"]["historicalfrost"].map((day, index) => {
                            let date = day["date"].split("-")
                            date = new Date(2020, parseInt(date[0]) - 1, parseInt(date[1]))
                            return { x: date, y: day["frostday"] }
                        })
                        setFrostData(seasonfor)
                        setFirstFrostDate(result["data"]["first_frost_day"])
                        // let seasonfor = result['historicalrainforecast'].map((day,index)=>{
                        //   return {x:day['monthstring'],y:day['precipitation']}
                        // });
                        // setFrostData(seasonfor);
                    })
                    .catch((error) => {
                        console.log("FirstError")
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log("SecondError")
                console.log(error)
            })
    }

    const loadGDDData = () => {
        currentUser
            .getIdToken()
            .then((userToken) => {
                networking
                    .get("/api/v1/gdd/historicalgdd/" + id, { extraHeaders: { "User-Token": userToken } })
                    .then((res) => res.data)
                    .then((result) => {
                        let total = 0
                        let seasonfor = result["data"]["historicalGDD"].map((day, index) => {
                            //total += convertGDDFromMetric(unitPreference, day["GDD"])
                            total += day["GDD"]
                            let date = day["date"].split("-")
                            date = new Date(2020, parseInt(date[0]) - 1, parseInt(date[1]))
                            return { x: date, y: convertGDDFromMetric(unitPreference, total) }
                        })
                        setGDDData(seasonfor)
                    })
                    .catch((error) => {
                        console.log("FirstError")
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log("SecondError")
                console.log(error)
            })
    }

    const loadGDDPredictionData = () => {
        currentUser
            .getIdToken()
            .then((userToken) => {
                networking
                    .get("/api/v1/gdd/" + id, { extraHeaders: { "User-Token": userToken } })
                    .then((res) => res.data)
                    .then((result) => {
                        //console.log(result['data']['historicalGDD'])
                        //let total = convertGDDFromMetric(unitPreference, result["data"]["GDDForecastDailyAdjust"])
                        let total = result["data"]["GDDForecastDailyAdjust"]
                        let seasonfor = result["data"]["GDDForecastDaily"].map((day, index) => {
                            //total += convertGDDFromMetric(unitPreference, day["GDD"])
                            total += day["GDD"]
                            let date = day["date"].split("-")
                            date = new Date(2020, parseInt(date[0]) - 1, parseInt(date[1]))
                            return { x: date, y: convertGDDFromMetric(unitPreference, total) }
                        })
                        setGDDPredictionData(seasonfor)
                    })
                    .catch((error) => {
                        console.log("FirstError")
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log("SecondError")
                console.log(error)
            })
    }

    const loadBasicNDVIData = () => {
        currentUser
            .getIdToken()
            .then((userToken) => {
                networking
                    .get("/api/v1/maps/ndvivalues?uuid=" + id, { extraHeaders: { "User-Token": userToken } })
                    .then((res) => res.data)
                    .then((result) => {
                        let ndvi_values = result.ndvi
                        ndvi_values.map((value) => {
                            let ndvi_value = value[0]
                            value[0] = Number(ndvi_value.toFixed(3))
                            return value
                        })
                        setndviData(ndvi_values)
                    })
                    .catch((error) => {
                        console.log("FirstError")
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log("SecondError")
                console.log(error)
            })
    }
    return (
        <div className={`satelite-section ${classes.root}`}>
            <Grid className="grid-container" container spacing={3}>
                <Grid className="left-subgrid-container" container item lg={9} spacing={3}>
                    <Grid item lg={12}>
                        <GDDGraph
                            className="SEASONAL-FORECAST"
                            gddyearly={gddData}
                            frostdays={frostData}
                            gddprediction={gddprediction}
                            latlon={ndvimapData["center"]}
                            first_frost={firstFrostDate}
                        />
                    </Grid>
                    <Grid className="chart" item lg={12}>
                        <DailyForecast className="SEASONAL-FORECAST" ndviVal={ndviData} />
                    </Grid>
                </Grid>

                <Grid className="right-subgrid-container" container lg spacing={3} item>
                    <Grid className="map" item lg>
                        <MapComponent info={ndvimapData} />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Satellite
