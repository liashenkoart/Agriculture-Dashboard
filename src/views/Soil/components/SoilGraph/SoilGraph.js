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
        alignItems: "flex-start",
        height: "100%",
    },
}))

const SoilGraph = (props) => {
    const { className, seasonalForecast, historicalrainforecast, temp_units } = props

    const classes = useStyles()

    const data = (canvas) => {
        return {
            datasets: [
                {
                    label: "Soil Temperature T0",
                    lineTension: 0.01,
                    type: "line",
                    data: seasonalForecast,
                    borderColor: "#000000",
                    backgroundColor: "#000000",
                    pointBorderColor: "#000000",
                    pointBackgroundColor: "#000000",
                    pointHoverBackgroundColor: "#000000",
                    pointHoverBorderColor: "#000000",
                    yAxisID: "y-axis-2",
                    pointRadius: 1,
                },
                {
                    label: "Soil Moisture",
                    type: "line",
                    lineTension: 0.01,
                    data: historicalrainforecast,
                    fill: false,
                    backgroundColor: "#55D771",
                    borderColor: "#55D771",
                    hoverBackgroundColor: "#55D771",
                    hoverBorderColor: "#55D771",
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
                        stepSize: 6,
                        unit: "hour",
                        displayFormats: {
                            hour: "MMM D hA",
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
                        labelString: "Moisture",
                        display: true,
                    },
                    ticks: {},
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
                        display: true,
                    },
                    ticks: {},
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
                    <Typography variant="h4" align="left">
                        Temperature vs Moisture
                    </Typography>
                    {loadAnimation(
                        seasonalForecast.length === 0 || historicalrainforecast.length === 0,
                        true,
                        <Bar data={data} options={options} height={338} />
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

SoilGraph.propTypes = {
    className: PropTypes.string,
    seasonalForecast: PropTypes.array,
}

export default SoilGraph
