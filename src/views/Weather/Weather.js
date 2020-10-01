// Import React
import React, { useContext, useEffect } from "react"
// Import Components
import { DailyForecast, SeasonalForecast, WeatherSideBar, WeatherWidget } from "./components"
// Import Libraries
import { makeStyles } from "@material-ui/styles"
import { Grid } from "@material-ui/core"
import { useParams } from "react-router-dom"
// Import Others
import { SettingsContext } from "../../Util/SettingsContext"
import {
    convertFromCelsius,
    convertFromCelsiusNum,
    convertFromFahren,
    convertFromKmH,
    convertFromM,
    convertFromMM,
} from "../../Util/UnitConversion"
import { AuthContext } from "../../Auth/Auth"
import networking from "../../Util/Networking"

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
}))

const Weather = () => {
    const classes = useStyles()
    let { id } = useParams()
    const [mapView, setMapView] = React.useState({})
    const [seasonalForecast, setSeasonalForecast] = React.useState([])
    const [precipitationForecast, setPrecipitationForecast] = React.useState([])
    const [historicalForecast, setHistoricalForecast] = React.useState([])
    const { currentSettings } = useContext(SettingsContext)
    const unitPreference = currentSettings.units
    const [week, setWeek] = React.useState([])
    const [weatherData, setWeatherData] = React.useState({
        temp: true,
        wind: true,
        windDegree: true,
        precipitation: true,
        precipitationdesc: "",
        coldrisk: true,
        coldriskdesc: "",
    })
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        if (currentUser !== null) {
            loadBasicWeatherData()
            loadSeasonalForecastData()
            loadPrecipitationForecastData()
            loadHistoricalWeatherData()
            loadFreezeRiskData()
            loadPrecipitationData()
            loadWeeklyForecastData()
        }
    }, [currentUser])

    const loadSeasonalForecastData = () => {
        currentUser
            .getIdToken()
            .then((userToken) => {
                networking
                    .get("/api/v1/temperature/seasonalforecast?uuid=" + id, {
                        extraHeaders: { "User-Token": userToken },
                    })
                    .then((res) => res.data)
                    .then((result) => {
                        let months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
                        let currentDate = new Date()
                        let currentMonth = currentDate.getMonth()
                        let currentYear = currentDate.getFullYear()
                        let seasonfor = result["seasonalforecast"].map((day, index) => {
                            let adjustedTemperature = day["temperature"] + result["adjusted"]
                            let year = currentYear
                            let month = day["month"]
                            if (month < currentMonth) {
                                year = year + 1
                            }
                            let i = months.indexOf(month)
                            if (i > -1) {
                                months.splice(i, 1)
                            }
                            return {
                                x: new Date(year, month),
                                y: convertFromCelsiusNum(unitPreference, adjustedTemperature),
                            }
                        })
                        months = months.map((month, index) => {
                            let year = currentYear
                            if (month < currentMonth) {
                                year = year + 1
                            }
                            return {
                                x: new Date(year, month),
                                y: null,
                            }
                        })
                        seasonfor = seasonfor.concat(months)
                        seasonfor = seasonfor.sort((a, b) => b.x - a.x)
                        setSeasonalForecast(seasonfor)
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

    const loadPrecipitationForecastData = () => {
        currentUser
            .getIdToken()
            .then((userToken) => {
                networking
                    .get("/api/v1/precipitation/historicalforecast/" + id, {
                        extraHeaders: { "User-Token": userToken },
                    })
                    .then((res) => res.data)
                    .then((result) => {
                        let currentDate = new Date()
                        let currentMonth = currentDate.getMonth()
                        let currentYear = currentDate.getFullYear()
                        let seasonfor = result["historicalrainforecast"].map((day, index) => {
                            let precipitation = day["precipitation"]
                            precipitation = convertFromM(unitPreference, precipitation)
                            let year = currentYear
                            let month = day["month"]
                            if (month < currentMonth) {
                                year = year + 1
                            }
                            return { x: new Date(year, month), y: precipitation }
                        })
                        seasonfor = seasonfor.sort((a, b) => b.x - a.x)
                        setPrecipitationForecast(seasonfor)
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

    const loadHistoricalWeatherData = () => {
        currentUser
            .getIdToken()
            .then((userToken) => {
                networking
                    .get("/api/v1/temperature/historicalweather?uuid=" + id, {
                        extraHeaders: { "User-Token": userToken },
                    })
                    .then((res) => res.data)
                    .then((result) => {
                        let currentDate = new Date()
                        let currentMonth = currentDate.getMonth()
                        let currentYear = currentDate.getFullYear()

                        let historical_data = result["historicalData"].map((day, index) => {
                            let year = currentYear
                            let month = day["monthIndex"]
                            if (month < currentMonth) {
                                year = year + 1
                            }
                            return { x: new Date(year, month), y: convertFromCelsiusNum(unitPreference, day["temp"]) }
                        })
                        historical_data = historical_data.sort((a, b) => b.x - a.x)
                        setHistoricalForecast(historical_data)
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

    const loadWeeklyForecastData = () => {
        currentUser
            .getIdToken()
            .then((userToken) => {
                networking
                    .get("/api/v1/temperature/weeklyforecastv2/" + id, {
                        extraHeaders: { "User-Token": userToken },
                    })
                    .then((res) => res.data)
                    .then((result) => {
                        // console.log("---->", result) // info to use in the new daily forecast, info might need to be rework in order to match design, moment js could be useful
                        // Format
                        // {
                        //     date: "2020-05-02",
                        //     day: "Sat",
                        //     temperature: {
                        //         max: "23°",
                        //         min: "13°",
                        //     },
                        //     precipitation: "53%",
                        //     icon: <CloudQueueIcon fontSize="large" />, // set icon logic, get icons from designer
                        // },
                        let seasonfor = result["weekly_forecast"].map((day, index) => {
                            let temperature = parseFloat(day["temperature"])
                            day["humidity"] = parseFloat(day["humidity"])
                            let maxTemperature = convertFromFahren(unitPreference, temperature)
                            let minTemperature = convertFromFahren(unitPreference, temperature)
                            let precipitation = day["humidity"]
                            precipitation = convertFromMM(unitPreference, precipitation)
                            return {
                                day: day["day_week"],
                                temperature: {
                                    max: maxTemperature,
                                    min: minTemperature,
                                },
                                precipitation: precipitation,
                            }
                        })
                        setWeek(seasonfor)
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
                    .get("/api/v1/temperature/weeklyforecast?uuid=" + id, {
                        extraHeaders: { "User-Token": userToken },
                    })
                    .then((res) => res.data)
                    .then((result) => {
                        // console.log("---->", result) // info to use in the new daily forecast, info might need to be rework in order to match design, moment js could be useful
                        setMapView(result.center)
                        let temperature = convertFromCelsius(unitPreference, result.currentWeather.temp)
                        let windSpeed = result.currentWeather.windSpeed
                        windSpeed = convertFromKmH(unitPreference, windSpeed)
                        let units = temperature.slice(-2)
                        temperature = temperature.slice(0, -2)
                        let windDegree = result.currentWeather.windDir
                        setWeatherData((prevState) => {
                            return {
                                ...prevState,
                                temp: temperature,
                                wind: windSpeed,
                                windDegree: windDegree,
                                units: units,
                            }
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

    const loadFreezeRiskData = () => {
        currentUser
            .getIdToken()
            .then((userToken) => {
                networking
                    .get("/api/v1/temperature/coldrisk/" + id, {
                        extraHeaders: { "User-Token": userToken },
                    })
                    .then((res) => res.data)
                    .then((result) => {
                        setWeatherData((prevState) => {
                            return {
                                ...prevState,
                                coldrisk: result.risk,
                            }
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

    const loadPrecipitationData = () => {
        currentUser
            .getIdToken()
            .then((userToken) => {
                networking
                    .get("/api/v1/precipitation/dailyforecast/" + id, {
                        extraHeaders: { "User-Token": userToken },
                    })
                    .then((res) => res.data)
                    .then((result) => {
                        let rain = result.rain
                        rain = convertFromMM(unitPreference, rain)
                        setWeatherData((prevState) => {
                            return {
                                ...prevState,
                                precipitation: rain,
                            }
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
        <div className={`WEATHER-SECTION ${classes.root}`}>
            <Grid className="GRID-CONTAINER" container spacing={4}>
                <Grid className="LEFT-SUBGRID-CONTAINER" container item lg={9} spacing={4}>
                    <Grid className="WEATHER-WIDGET-GRID" item lg={12}>
                        <WeatherWidget className="WEATHER-WIDGET" weatherData={weatherData} />
                    </Grid>

                    <Grid item lg={12}>
                        <DailyForecast className="DAILY-FORECAST" week={week} />
                    </Grid>
                    <Grid item lg={12}>
                        <SeasonalForecast
                            className="SEASONAL-FORECAST"
                            seasonalForecast={seasonalForecast}
                            historicalrainforecast={precipitationForecast}
                            historicalforecast={historicalForecast}
                            temp_units={unitPreference === "metric" ? "°C" : "°F"}
                            rain_units={unitPreference === "metric" ? "mm" : "in."}
                        />
                    </Grid>
                </Grid>
                <Grid item lg={3}>
                    <WeatherSideBar className="WEATHER-SIDE-BAR" coord={mapView} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Weather
