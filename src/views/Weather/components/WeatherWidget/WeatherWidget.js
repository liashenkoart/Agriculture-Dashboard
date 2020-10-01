import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import { Grid, Typography } from "@material-ui/core"
import loadAnimation from "../../../../helpers/loadingFunction"

const useStyles = makeStyles((theme) => ({
    content: {
        alignItems: "center",
        display: "flex",
    },
    title: {
        fontWeight: 700,
        textAlign: "center",
    },
    widgetCircle: {
        height: "125px",
        width: "125px",
        borderRadius: "100%",
        boxShadow: theme.palette.effectStyles.backGlowCards.boxShadow,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "8px",
    },
    scaleSpan: {
        fontSize: "18px",
        verticalAlign: "super",
    },
    temperature: {
        color: theme.palette.colorStyles.orangeClimate,
    },
    wind: {
        color: theme.palette.colorStyles.yellowWind,
    },
    precipitation: {
        color: theme.palette.colorStyles.bluePrecipitation,
    },
    coldRisk: {
        color: theme.palette.info.light,
    },
}))

const WeatherWidget = (props) => {
    const { weatherData, className } = props

    const classes = useStyles()

    return (
        <div className={className}>
            <Grid
                container
                justify="space-evenly" // to make the circle's spacing appropriate even in bigger screen, still a review might be in order to determine the look and if media querires will be required
            >
                <Grid item>
                    <div className={classes.widgetCircle}>
                        {loadAnimation(
                            weatherData.temp,
                            true,
                            <Typography
                                className={classes.temperature}
                                variant="h1" // https://moz.com/community/q/is-single-h1-tag-still-best-practice
                            >
                                {weatherData.temp}
                                <span className={classes.scaleSpan}>{weatherData.units}</span>
                            </Typography>
                        )}
                    </div>
                    <Typography className={classes.title} variant="body2">
                        Temperature
                    </Typography>
                </Grid>

                <Grid item>
                    <div className={classes.widgetCircle}>
                        {loadAnimation(
                            weatherData.windDegree,
                            true,
                            <div>
                                <Typography className={classes.wind} align={"center"} variant="h1">
                                    &nbsp;{weatherData.windDegree}°
                                </Typography>
                                <Typography className={classes.wind} variant="h5">
                                    @{weatherData.wind}
                                </Typography>
                            </div>
                        )}
                    </div>
                    <Typography className={classes.title} variant="body2">
                        Wind
                    </Typography>
                </Grid>

                <Grid item>
                    <div className={classes.widgetCircle}>
                        {loadAnimation(
                            weatherData.precipitation,
                            true,
                            <div>
                                <Typography className={classes.precipitation} variant="h1">
                                    {weatherData.precipitation}
                                </Typography>
                                <Typography className={classes.precipitation} variant="h5">
                                    {weatherData.precipitationdesc}
                                </Typography>
                            </div>
                        )}
                    </div>
                    <Typography className={classes.title} variant="body2">
                        Precipitation
                    </Typography>
                </Grid>

                <Grid item>
                    <div className={classes.widgetCircle}>
                        {loadAnimation(
                            weatherData.coldrisk,
                            true,
                            <div>
                                <Typography className={classes.coldRisk} variant="h1">
                                    {weatherData.coldrisk}%
                                </Typography>
                                <Typography className={classes.coldRisk} variant="h5">
                                    {weatherData.coldriskdesc}
                                </Typography>
                            </div>
                        )}
                    </div>
                    <Typography className={classes.title} variant="body2">
                        Cold Risk
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

WeatherWidget.propTypes = {
    className: PropTypes.string,
    weatherData: PropTypes.object,
}

export default WeatherWidget
