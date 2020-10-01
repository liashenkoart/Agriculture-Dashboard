// Import React
import React from "react"
// Import Libraries
import clsx from "clsx"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import { Card, CardContent, Grid, Typography } from "@material-ui/core"
import CloudQueueIcon from "@material-ui/icons/CloudQueue"

// const week = [ // probably add logic to always have the info starting from sunday first or accomodate as needed
// 	{
// 		date: "2020-04-26",
// 		day: "Sun",
// 		temperature: {
// 			max: "23°",
// 			min: "13°",
// 		},
// 		precipitation: "53%",
// 		icon: <CloudQueueIcon fontSize = "large" /> // set icon logic, get icons from designer
// 	},
// ]

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        boxShadow: theme.palette.effectStyles.backGlowCards.boxShadow,
        borderRadius: "20px",
    },
    content: {
        paddingBottom: "16px !important",
        position: "relative",
    },
    dashLine: {
        "&::before": {
            content: '" "',
            position: "absolute",
            marginLeft: "8.8%",
            width: "1px",
            height: "80%",
            borderRight: "1px dashed lavender", // inactive icon was too strong added lavender as a temp
        },
    },
    margin: {
        fontWeight: "500",
        marginBottom: "12px",
    },
    max: {
        color: theme.palette.colorStyles.activeIcon,
    },
    min: {
        color: theme.palette.colorStyles.inactiveIcon,
    },
    precipitation: {
        color: theme.palette.colorStyles.bluePrecipitation,
    },
    svg: {
        textAlign: "center",
    },
}))

const DailyForecast = (props) => {
    const { className, week } = props

    const classes = useStyles()

    return (
        <Card className={clsx(classes.root, className)}>
            <CardContent className={classes.content}>
                <Grid container justify="space-around" alignItems="center">
                    {week.map((day, index) => {
                        let dashClass = index !== 6 ? classes.dashLine : ""
                        return (
                            <Grid className={dashClass} key={index} item>
                                <Typography
                                    className={`${classes.margin} ${classes.max}`}
                                    variant="body2"
                                    align="center"
                                >
                                    {day.day}
                                </Typography>
                                <Typography
                                    className={`${classes.margin} ${classes.max}`}
                                    variant="body2"
                                    align="center"
                                >
                                    {day.temperature.max}
                                    {/*/<span className = {classes.min} >{day.temperature.min}</span>*/}
                                </Typography>
                                <Typography
                                    className={`${classes.margin} ${classes.precipitation}`}
                                    variant="body2"
                                    align="center"
                                >
                                    {day.precipitation}
                                </Typography>
                                <div className={classes.svg}>
                                    <CloudQueueIcon fontSize="large" />
                                </div>
                            </Grid>
                        )
                    })}
                </Grid>
            </CardContent>
        </Card>
    )
}

DailyForecast.propTypes = {
    className: PropTypes.string,
    weeklyForecast: PropTypes.array,
}

export default DailyForecast
