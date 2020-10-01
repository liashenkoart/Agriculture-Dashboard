// Import React
import React, { useContext, useEffect, useState } from "react"
// Import components
import { AlertFeed, BasicCard, BasicDate, ClimateOverview, GrowStage } from "./components"
// Import from libraries
import { makeStyles } from "@material-ui/styles"
import { Grid } from "@material-ui/core"
import { useParams } from "react-router-dom"
import { SettingsContext } from "../../Util/SettingsContext"
import { convertFromCelsius, convertFromKmH, convertFromMM } from "../../Util/UnitConversion"
import { AuthContext } from "../../Auth/Auth"
import networking from "../../Util/Networking"
const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
}))

const Dashboard = () => {
    let { id } = useParams()
    const classes = useStyles()
    const [fieldInfo, setFieldInfo] = useState({
        product: true,
        date: "",
        notes: "",
        variety: "",
    })
    const [estimatedHarvest, setHarvest] = useState({
        date: "",
    })
    const [cropStage, setCropStage] = useState({
        stage: 0,
        stage_name: "",
    })
    const [alerts, setAlerts] = useState([])
    const [weatherInfo, setWeatherInfo] = useState({
        temp: true,
        wind: true,
        windDegree: true,
        tempmax: true,
        tempmin: true,
    })
    const { currentUser } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)
    const { currentSettings } = useContext(SettingsContext)
    const unitPreference = currentSettings.units

    useEffect(() => {
        if (currentUser !== null) {
            loadBasicWeatherData()
            loadBasicFieldData()
            loadHarvestDate()
            loadAlerts()
            loadCropStage()
        }
    }, [currentUser])

    const loadBasicFieldData = () => {
        currentUser
            .getIdToken()
            .then((userToken) => {
                networking
                    .get("/api/v1/fields/" + id, { extraHeaders: { "User-Token": userToken } })
                    .then((res) => res.data)
                    .then((result) => {
                        // console.log(result)
                        let d = result.data.plantingDateP ? result.data.plantingDateP : "N/A"
                        let n = result.data.notes ? result.data.notes : ""
                        let p = result.data.crop ? result.data.crop : "N/A"
                        let variety = result.data.variety
                        setFieldInfo({
                            date: d,
                            notes: n,
                            product: p,
                            variety: variety,
                        })
                        //setSeasonalForecast(seasonFor);
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

    const loadBasicWeatherData = () => {
        currentUser
            .getIdToken()
            .then((userToken) => {
                networking
                    .get("/api/v1/temperature/weeklyforecast?uuid=" + id, { extraHeaders: { "User-Token": userToken } })
                    .then((res) => res.data)
                    .then((result) => {
                        // console.log(result.weeklyforecast)
                        let currentTemperature = result.currentWeather.temp
                        let windSpeed = result.currentWeather.windSpeed
                        windSpeed = convertFromKmH(unitPreference, windSpeed)
                        let windDirection = result.currentWeather.windDir
                        let maxTemperature = result.weeklyforecast[0].max
                        let minTemperature = result.weeklyforecast[0].min
                        maxTemperature = convertFromCelsius(unitPreference, maxTemperature)
                        minTemperature = convertFromCelsius(unitPreference, minTemperature)
                        setWeatherInfo({
                            temp: currentTemperature,
                            wind: windSpeed,
                            windDegree: windDirection,
                            tempmax: maxTemperature,
                            tempmin: minTemperature,
                        })
                        setIsLoading(false)
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

    const loadHarvestDate = () => {
        currentUser
            .getIdToken()
            .then((userToken) => {
                networking
                    .get("/api/v1/harvest/estimateHarvest?uuid=" + id, { extraHeaders: { "User-Token": userToken } })
                    .then((res) => res.data)
                    .then((result) => {
                        // console.log(result.weeklyforecast)
                        setHarvest({
                            date: result.harvestDate,
                        })
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

    const loadAlerts = () => {
        currentUser
            .getIdToken()
            .then((userToken) => {
                networking
                    .get("/api/v1/alerts/" + id, { extraHeaders: { "User-Token": userToken } })
                    .then((res) => res.data)
                    .then((result) => {
                        // console.log(result.weeklyforecast)
                        let today = new Date()
                        let time =
                            (today.getHours() < 10 ? "0" : "") +
                            today.getHours() +
                            ":" +
                            (today.getMinutes() < 10 ? "0" : "") +
                            today.getMinutes()
                        let alertsT = []
                        if (result.data.dayWarning) {
                            alertsT.push({
                                alert: true,
                                type: "meteo",
                                date: "Today",
                                time: time + " Local",
                                title: "Meteorological Alert",
                                description:
                                    "Excessive Heat Warning, temperatures above " +
                                    convertFromCelsius(unitPreference, 34) +
                                    " forecasted",
                            })
                        }
                        if (result.data.frostWarning) {
                            alertsT.push({
                                alert: true,
                                type: "meteo",
                                date: "Today",
                                time: time + " Local",
                                title: "Meteorological Alert",
                                description: "Frost Warning",
                            })
                        }
                        if (result.data.nightWarning) {
                            alertsT.push({
                                alert: true,
                                type: "meteo",
                                date: "Today",
                                time: time + " Local",
                                title: "Meteorological Alert",
                                description:
                                    "Excessive Cold Warning, temperatures below " +
                                    convertFromCelsius(unitPreference, 18) +
                                    " forecasted",
                            })
                        }
                        if (result.data.rainWarning) {
                            alertsT.push({
                                alert: true,
                                type: "meteo",
                                date: "Today",
                                time: time + " Local",
                                title: "Meteorological Alert",
                                description:
                                    "Excessive Rain Warning, precipitation > " +
                                    convertFromMM(unitPreference, 60) +
                                    " forecasted",
                            })
                        }
                        if (alertsT.length === 0) {
                            alertsT.push({
                                alert: true,
                                type: "ok",
                                date: "Today",
                                time: time + " Local",
                                title: "Everything's OK",
                                description: "It seems that everything is going fine!",
                            })
                        }
                        setAlerts(alertsT)
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

    const loadCropStage = () => {
        currentUser
            .getIdToken()
            .then((userToken) => {
                networking
                    .get("/api/v1/crop/stage_estimation/" + id, { extraHeaders: { "User-Token": userToken } })
                    .then((res) => res.data)
                    .then((result) => {
                        setCropStage({
                            stage: result["stage_index"],
                            stage_name: result["stage_estimated"],
                        })
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
        <div className={`DASHBOARD-SECTION ${classes.root}`}>
            <Grid className="GRID-CONTAINER" container spacing={3}>
                <Grid className="LEFT-SUBGRID-CONTAINER" container item lg={9} spacing={3}>
                    <Grid className="LEFT-UPPERLEFT-SUBGRID-CONTAINER" container item lg={3}>
                        <Grid className="CLIMATE-OVERVIEW-GRID" item container>
                            <ClimateOverview
                                className="CLIMATE-OVERVIEW"
                                alert="Agronomic Alert"
                                maxTemperature={weatherInfo.tempmax}
                                minTemperature={weatherInfo.tempmin}
                                wind={weatherInfo.wind}
                                precipitation="Precipitation"
                                daylight="9 h"
                                loading={isLoading}
                            />
                        </Grid>
                    </Grid>
                    <Grid className="LEFT-UPPERRIGHT-SUBGRID-CONTAINER" container item lg={9} spacing={3}>
                        <Grid className="CROP-GRID" item lg={4}>
                            <BasicCard
                                className="CROP"
                                title={fieldInfo.product}
                                subtitle={fieldInfo.variety}
                                status="Normal"
                            />
                        </Grid>
                        <Grid className="PLANTING-DATE-GRID" item lg={4}>
                            <BasicDate className="PLANTING-DATE" title="Planting Date" date={fieldInfo.date} />
                        </Grid>
                        <Grid className="HARVEST-DAY-GRID" item lg={4}>
                            <BasicDate
                                className="HARVEST-DAY"
                                title="Expected Harvest Day"
                                date={estimatedHarvest.date}
                                opacity
                            />
                        </Grid>
                        <Grid className="METEOROLOGICAL-GRID" item lg={4}>
                            <BasicCard
                                className="METEOROLOGICAL-STATUS"
                                title="Meteorological Status"
                                status="Normal"
                            />
                        </Grid>
                        <Grid className="SOIL-GRID" item lg={4}>
                            <BasicCard className="SOIL-STATUS" title="Soil Status" status="Normal" />
                        </Grid>
                        <Grid className="CLOUDS-GRID" item lg={4}>
                            <BasicCard
                                className="PLANT-STAGE"
                                plantStage={cropStage.stage} // pass a number, prop representing the growth stage
                                alert
                                title={cropStage.stage === 0 ? true : "Growth Stage"}
                                status={cropStage.stage_name}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        className="LEFT-BOTTOM-SUBGRID-CONTAINER"
                        item
                        lg={12}
                        style={{ paddingRight: "35px" }} // for alignment purposes
                    >
                        <GrowStage className="GROW-STAGE-CARD" growthStage={cropStage.stage} />
                    </Grid>
                </Grid>
                <Grid className="RIGHT-SUBGRID-CONTAINER" container lg spacing={3} item>
                    <Grid className="ALERT-FEED-GRID" item container lg>
                        <AlertFeed className="ALERT-FEED" data={[...alerts]} />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard
