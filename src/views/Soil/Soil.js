// Import React
import React, { useContext, useEffect, useState } from "react"
// Import Components
import { PlantStage, BasicCard, SoilGraph } from "./components"
// Import Libraries
import { makeStyles } from "@material-ui/styles"
import { Grid } from "@material-ui/core"
import { useParams } from "react-router-dom"
import axios from "axios"
// Import Others
import { convertFromCelsiusNum } from "../../Util/UnitConversion"
import { SettingsContext } from "../../Util/SettingsContext"
import { AuthContext } from "../../Auth/Auth"
import networking from "../../Util/Networking"

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
}))

const Soil = () => {
    const classes = useStyles()
    let { id } = useParams()
    const [soilTemperature, setSoilTemperature] = useState([])
    const [soilMoisture, setSoilMoisture] = useState([])
    const { currentUser } = useContext(AuthContext)
    const { currentSettings } = useContext(SettingsContext)
    const unitPreference = currentSettings.units
    useEffect(() => {
        if (currentUser !== null) {
            loadSoilTemperatureData()
            loadSoilMoistureData()
        }
    }, [currentUser])

    const loadSoilTemperatureData = () => {
        currentUser
            .getIdToken()
            .then((userToken) => {
                networking
                    .get("/api/v1/soil/fieldSoilTemperatureFuture?uuid=" + id, {
                        extraHeaders: { "User-Token": userToken },
                    })
                    .then((res) => res.data)
                    .then((result) => {
                        let soilTemperature = result["soilTForecast"].map((day, index) => {
                            let soil_temp = day["temperature"]
                            soil_temp = convertFromCelsiusNum(unitPreference, soil_temp)
                            let hour = Number(day["hour"])
                            let date_val = new Date()
                            date_val.setHours(hour)
                            date_val.setMinutes(0)
                            date_val.setSeconds(0)
                            date_val.setMilliseconds(0)
                            return { x: date_val, y: soil_temp }
                        })
                        setSoilTemperature(soilTemperature)
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

    const loadSoilMoistureData = () => {
        currentUser
            .getIdToken()
            .then((userToken) => {
                networking
                    .get("/api/v1/soil/fieldSoilMoistureFuture?uuid=" + id, {
                        extraHeaders: { "User-Token": userToken },
                    })
                    .then((res) => res.data)
                    .then((result) => {
                        let soilMoisture = result["soilMForecast"].map((day, index) => {
                            let hour = Number(day["hour"])
                            let date_val = new Date()
                            date_val.setHours(hour)
                            date_val.setMinutes(0)
                            date_val.setSeconds(0)
                            date_val.setMilliseconds(0)
                            return { x: date_val, y: day["moisture"] }
                        })
                        setSoilMoisture(soilMoisture)
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
        <div className={`WEATHER-SECTION ${classes.root}`}>
            <Grid className="GRID-CONTAINER" container spacing={4}>
                <Grid className="LEFT-SUBGRID-CONTAINER" container item lg={9} spacing={4}>
                    <Grid className="SOIL-WIDGET-GRID" item lg={3}>
                        <BasicCard className="SOIL-TYPE-STATUS" title="Soil Type" status="Normal" />
                    </Grid>
                    <Grid className="SOIL-WIDGET-GRID" item lg={3}>
                        <BasicCard className="SOIL-PH-STATUS" title="Soil PH" status="5.5 - 8.4" />
                    </Grid>
                    <Grid className="SOIL-WIDGET-GRID" item lg={3}>
                        <BasicCard
                            className="SOIL-TEMPERATURE-STATUS"
                            title="Soil Temperature Depth"
                            status="5.5 - 8.4"
                        />
                    </Grid>
                    <Grid className="SOIL-WIDGET-GRID" item lg={3}>
                        <BasicCard
                            className="SOIL-TEMPERATURE-SURFACE-STATUS"
                            title="Soil Temperature Surface"
                            status="10.5 - 15.4"
                            plantStage={true}
                        />
                    </Grid>
                    <Grid item lg={12}>
                        <SoilGraph
                            className="SEASONAL-FORECAST"
                            seasonalForecast={soilTemperature}
                            historicalrainforecast={soilMoisture}
                            temp_units={unitPreference === "metric" ? "°C" : "°F"}
                        />
                    </Grid>
                </Grid>
                <Grid item lg={3}>
                    <Grid className="ALERT-FEED-GRID" item container lg>
                        <PlantStage className="ALERT-FEED" stage={"Emergence"} />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Soil
