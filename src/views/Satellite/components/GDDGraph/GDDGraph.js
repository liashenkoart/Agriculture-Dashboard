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

const GDDGraph = (props) => {
    const { className, gddyearly, frostdays, latlon, gddprediction, first_frost } = props

    const classes = useStyles()

    const data = (canvas) => {
        const ctx = canvas.getContext("2d")
        const gradient = ctx.createLinearGradient(0, 0, 0, 170)
        gradient.addColorStop(0, "rgba(218,56,73,1)")
        gradient.addColorStop(1, "rgba(218,56,73,0)")
        return {
            //labels: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: "Historical GDD",
                    lineTension: 0.1,
                    type: "line",
                    data: gddyearly,
                    borderColor: "#000000",
                    backgroundColor: gradient,
                    pointBorderColor: "#000000",
                    pointBackgroundColor: "#000000",
                    pointHoverBackgroundColor: "#000000",
                    pointHoverBorderColor: "#000000",
                    yAxisID: "y-axis-2",
                    borderDash: [10, 5],
                    pointRadius: 0,
                },
                {
                    label: "Forecast",
                    lineTension: 0.1,
                    type: "line",
                    data: gddprediction,
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
                    label: "Frost Days",
                    type: "bar",
                    data: frostdays,
                    fill: false,
                    backgroundColor: "#7EB6EA",
                    borderColor: "#7EB6EA",
                    hoverBackgroundColor: "#7EB6EA",
                    hoverBorderColor: "#7EB6EA",
                    yAxisID: "y-axis-1",
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
                        labelString: "Last Sprint/First Fall Frost (# of years)",
                        display: true,
                    },
                    ticks: {
                        fontColor: "#000000",
                        beginAtZero: true,
                        suggestedMax: 6,
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
                        labelString: "Accumulated [Crop] GDD",
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
                    <Typography variant="h3" style={{ alignSelf: "flex-start" }}>
                        Potato Growth
                    </Typography>
                    <Typography variant="h5" style={{ alignSelf: "flex-start" }}>
                        Loc:({latlon ? latlon["lat"].toFixed(3) : ""},{latlon ? latlon["lon"].toFixed(3) : ""})
                    </Typography>
                    <Typography variant="h5" style={{ alignSelf: "flex-start" }}>
                        Freeze: Climatology calculated 2003-2019
                    </Typography>
                    <Typography variant="h5" style={{ alignSelf: "flex-start" }}>
                        First Frost Day Predicted = {first_frost}
                    </Typography>
                    {loadAnimation(1, 0, <Bar data={data} options={options} height={170} />)}
                </div>
            </CardContent>
        </Card>
    )
}

GDDGraph.propTypes = {
    className: PropTypes.string,
    seasonalForecast: PropTypes.array,
}

export default GDDGraph
