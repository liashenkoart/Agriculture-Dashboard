import React from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import { Card, CardContent, Typography } from "@material-ui/core"
import { Chart, Line } from "react-chartjs-2"
import DownsamplePlugin from "chartjs-plugin-downsample"
import loadAnimation from "../../../../helpers/loadingFunction"

Chart.plugins.register(DownsamplePlugin)

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

const NDVIGraph = (props) => {
    const { ndviVal, className, ...rest } = props

    const classes = useStyles()

    const data = {
        datasets: [
            {
                label: "Climate AI Vegetation Index",
                fill: true,
                ticks: {},
                lineTension: 0.1,
                backgroundColor: "rgba(201,40,59,0.4)",
                borderColor: "rgba(201,40,59,1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(201,40,59,0.4)",
                pointBackgroundColor: "rgba(201,40,59,1)",
                pointBorderWidth: 1,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: "rgba(201,40,59,0.4)",
                pointHoverBorderColor: "rgba(201,40,59,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data:
                    ndviVal.length === 0
                        ? [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
                        : ndviVal
                              .filter((d) => {
                                  return d[0] !== 0
                              })
                              .map((f) => {
                                  return { x: new Date(f[1]), y: f[0] }
                              }),
            },
        ],
    }

    return (
        <Card {...rest} className={clsx(classes.root, className)}>
            <CardContent>
                <div className={classes.difference} style={{ flexDirection: "column" }}>
                    <Typography variant="h3" style={{ alignSelf: "flex-start" }}>
                        Climate AI Vegetation Index
                    </Typography>
                    {loadAnimation(
                        ndviVal.length,
                        0,
                        <Line
                            data={data}
                            height={170}
                            options={{
                                scales: {
                                    xAxes: [
                                        {
                                            type: "time",
                                            time: {
                                                unit: "month",
                                            },
                                        },
                                    ],
                                },
                                maintainAspectRatio: false,
                            }}
                        />
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

NDVIGraph.propTypes = {
    className: PropTypes.string,
    ndviVal: PropTypes.array,
}

export default NDVIGraph
