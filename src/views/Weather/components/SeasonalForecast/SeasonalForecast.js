// Import React
import React from "react"
// Import Libraries
import clsx from "clsx"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import { Card, CardContent, Typography } from "@material-ui/core"
import { Bar } from "react-chartjs-2" // rendering issues on resize
// Import Others
import loadAnimation from "../../../../helpers/loadingFunction"

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        boxShadow: theme.palette.effectStyles.backGlowCards.boxShadow,
        borderRadius: "20px",
    },
    difference: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
}))

const SeasonalForecast = (props) => {
    const { className, seasonalForecast, historicalrainforecast, historicalforecast, temp_units, rain_units } = props

    const classes = useStyles()

    const data = (canvas) => {
        const ctx = canvas.getContext("2d")
        const gradient = ctx.createLinearGradient(0, 0, 0, 170)
        gradient.addColorStop(0, "rgba(218,56,73,1)")
        gradient.addColorStop(1, "rgba(218,56,73,0)")
        return {
            //labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            spanGaps: true,
            datasets: [
                {
                    label: "Historical",
                    lineTension: 0.1,
                    type: "line",
                    data: historicalforecast,
                    fill: true,
                    borderColor: "#DA3849",
                    backgroundColor: gradient,
                    pointBorderColor: "#DA3849",
                    pointBackgroundColor: "#DA3849",
                    pointHoverBackgroundColor: "#DA3849",
                    pointHoverBorderColor: "#DA3849",
                    yAxisID: "y-axis-2",
                    pointRadius: 1,
                },
                {
                    label: "Forecast",
                    lineTension: 0.1,
                    type: "line",
                    data: seasonalForecast,
                    borderColor: "#F5A363",
                    backgroundColor: "#F5A363",
                    pointBorderColor: "#F5A363",
                    pointBackgroundColor: "#F5A363",
                    pointHoverBackgroundColor: "#F5A363",
                    pointHoverBorderColor: "#F5A363",
                    yAxisID: "y-axis-2",
                    pointRadius: 1,
                },
                {
                    label: "Precipitation",
                    type: "line",
                    lineTension: 0.1,
                    data: historicalrainforecast,
                    fill: false,
                    backgroundColor: "#7EB6EA",
                    borderColor: "#7EB6EA",
                    hoverBackgroundColor: "#7EB6EA",
                    hoverBorderColor: "#7EB6EA",
                    yAxisID: "y-axis-1",
                    pointRadius: 1,
                },
            ],
        }
    }

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
            mode: "label",
        },
        elements: {
            line: {
                fill: false,
            },
        },
        scales: {
            xAxes: [
                {
                    type: "time",
                    time: {
                        unit: "month",
                        displayFormats: {
                            month: "MMM",
                        },
                    },
                },
            ],
            yAxes: [
                {
                    type: "linear",
                    display: true,
                    position: "right",
                    id: "y-axis-1",
                    gridLines: {
                        display: false,
                    },
                    scaleLabel: {
                        fontColor: "#7EB6EA",
                        labelString: "Rainfall in " + rain_units,
                        display: true,
                    },
                    ticks: {
                        fontColor: "#7EB6EA",
                        beginAtZero: true,
                    },
                    labels: {
                        show: true,
                    },
                },
                {
                    type: "linear",
                    display: true,
                    position: "left",
                    id: "y-axis-2",
                    gridLines: {
                        display: false,
                    },
                    scaleLabel: {
                        labelString: "Temperature in " + temp_units,
                        fontColor: "#F5A363",
                        display: true,
                    },
                    ticks: {
                        fontColor: "#F5A363",
                    },
                    labels: {
                        show: true,
                    },
                },
            ],
        },
    }

    return (
        <Card className={clsx(classes.root, className)}>
            <CardContent>
                <div className={classes.difference}>
                    <Typography variant="h3" align="left">
                        Seasonal Forecast
                    </Typography>
                    {loadAnimation(
                        seasonalForecast.length === 0 ||
                            historicalrainforecast.length === 0 ||
                            historicalforecast.length === 0,
                        true,
                        <Bar data={data} options={options} height={170} />
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

SeasonalForecast.propTypes = {
    className: PropTypes.string,
    seasonalForecast: PropTypes.array,
}

export default SeasonalForecast
