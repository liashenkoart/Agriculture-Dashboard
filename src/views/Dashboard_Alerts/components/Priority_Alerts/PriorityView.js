// Import React
import React, { Fragment, useEffect, useState } from "react"
// Import Helpers
//Import libraries
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import { Card, CardContent, Divider, Grid, Typography } from "@material-ui/core"
import { AlertFeed } from "../index"
import app from "../../../../Util/Fire"
import axios from "axios"
import { useParams } from "react-router-dom"
import networking from "../../../../Util/Networking"

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}))

const ClimateOverview = (props) => {
    const { className } = props
    let { id } = useParams()
    const classes = useStyles()
    const [alerts, setAlerts] = useState({
        m_alerts: [],
        a_alerts: [],
        c_alerts: [],
        s_alerts: [],
    })

    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        app.auth().onAuthStateChanged(setCurrentUser)
    }, [])

    useEffect(() => {
        if (currentUser !== null) {
            loadAlerts()
        }
    }, [currentUser])

    const parseAlerts = (alertArray) => {
        let m_alerts, s_alerts, c_alerts, a_alerts, soil_alerts, weather_alerts, alert
        m_alerts = []
        s_alerts = []
        c_alerts = []
        a_alerts = []
        let array_length = alertArray.length
        for (let i = 0; i < array_length; i++) {
            alert = alertArray[i]
            soil_alerts = alert.alerts.soil_alerts.soilAlerts
            weather_alerts = alert.alerts.weather_alerts
            if (weather_alerts.dayWarning) {
                m_alerts.push({
                    alert: true,
                    type: "meteo",
                    date: "Today",
                    time: "14:00 Local",
                    title: "Meteorological Alert",
                    description: "Excessive Heat Warning, temperatures above 34 C forecasted",
                })
            }
            if (weather_alerts.frostWarning) {
                m_alerts.push({
                    alert: true,
                    type: "meteo",
                    date: "Today",
                    time: "14:00 Local",
                    title: "Meteorological Alert",
                    description: "Frost Warning",
                })
            }
            if (weather_alerts.nightWarning) {
                m_alerts.push({
                    alert: true,
                    type: "meteo",
                    date: "Today",
                    time: "14:00 Local",
                    title: "Meteorological Alert",
                    description: "Excessive Cold Warning, temperatures below 18 C forecasted",
                })
            }
            if (weather_alerts.rainWarning) {
                m_alerts.push({
                    alert: true,
                    type: "meteo",
                    date: "Today",
                    time: "14:00 Local",
                    title: "Meteorological Alert",
                    description: "Excessive Rain Warning, precipitation > 60 mm forecasted",
                })
            }
            let soil_length = soil_alerts.length
            for (let j = 0; j < soil_length; j++) {
                let soil_alert = soil_alerts[j]
                if (soil_alert.soilFreezeWarning) {
                    s_alerts.push({
                        alert: true,
                        type: "meteo",
                        date: "Today",
                        time: "14:00 Local",
                        title: "Meteorological Alert",
                        description: "Excessive Heat Warning, temperatures above 34 C forecasted",
                    })
                }
                if (soil_alert.soilLowMoisture) {
                    s_alerts.push({
                        alert: true,
                        type: "meteo",
                        date: "Today",
                        time: "14:00 Local",
                        title: "Meteorological Alert",
                        description: "Frost Warning",
                    })
                }
                if (soil_alert.soilTemperatureWarning) {
                    s_alerts.push({
                        alert: true,
                        type: "meteo",
                        date: "Today",
                        time: "14:00 Local",
                        title: "Meteorological Alert",
                        description: "Excessive Cold Warning, temperatures below 18 C forecasted",
                    })
                }
            }
        }
        let new_state = {
            m_alerts: m_alerts,
            a_alerts: a_alerts,
            c_alerts: c_alerts,
            s_alerts: s_alerts,
        }
        setAlerts(new_state)
    }

    const loadAlerts = () => {
        app.auth()
            .currentUser.getIdToken()
            .then((userToken) => {
                networking
                    .get("/api/v1/alertsregional/" + id + "/priority", { extraHeaders: { "User-Token": userToken } })
                    .then((res) => res.data)
                    .then((result) => {
                        // console.log(result.weeklyforecast)
                        parseAlerts(result.data.alerts[0].alerts)
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
        <Grid className="GRID-CONTAINER" container spacing={3}>
            <Grid className="RIGHT-SUBGRID-CONTAINER" container lg spacing={3} item>
                <Grid className="ALERT-FEED-GRID" item container lg>
                    <AlertFeed className="ALERT-FEED" feed_name="Agronomic Alert" data={[...alerts.a_alerts]} />
                </Grid>
            </Grid>
            <Grid className="RIGHT-SUBGRID-CONTAINER" container lg spacing={3} item>
                <Grid className="ALERT-FEED-GRID" item container lg>
                    <AlertFeed className="ALERT-FEED" feed_name="Meteorological Alert" data={[...alerts.m_alerts]} />
                </Grid>
            </Grid>
            <Grid className="RIGHT-SUBGRID-CONTAINER" container lg spacing={3} item>
                <Grid className="ALERT-FEED-GRID" item container lg>
                    <AlertFeed className="ALERT-FEED" feed_name="Soil Alert" data={[...alerts.s_alerts]} />
                </Grid>
            </Grid>
            <Grid className="RIGHT-SUBGRID-CONTAINER" container lg spacing={3} item>
                <Grid className="ALERT-FEED-GRID" item container lg>
                    <AlertFeed className="ALERT-FEED" feed_name="Climate Risk" data={[...alerts.c_alerts]} />
                </Grid>
            </Grid>
        </Grid>
    )
}

ClimateOverview.propTypes = {
    className: PropTypes.string,
    temperature: PropTypes.number,
}

export default ClimateOverview
