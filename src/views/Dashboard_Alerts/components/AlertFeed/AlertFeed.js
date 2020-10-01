// Import React
import React, { Fragment } from "react"
// Import Helpers
//Import libraries
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import { Card, CardContent, Divider, Grid, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    root: {
        width: "inherit",
        display: "flex",
        boxShadow: theme.palette.effectStyles.backGlowCards.boxShadow,
        borderRadius: "20px",
        position: "relative",
        height: "656px", // fill available, stretch
        overflow: "auto",
    },
    cardContent: {
        width: "inherit",
    },
    divider: {
        margin: "4px 0 16px",
    },
    subCard: {
        display: "flex",
        margin: "4px 0 8px 0",
        boxShadow: theme.palette.effectStyles.backGlowCards.boxShadow,
    },
    colorLabel: {
        width: "4px",
    },
    colorLabelAgro: {
        backgroundColor: theme.palette.colorStyles.positiveAlert,
    },
    colorLabelMeteo: {
        backgroundColor: theme.palette.colorStyles.negativeAlert,
    },
    colorLabelSoil: {
        backgroundColor: theme.palette.colorStyles.mediumStatus,
    },
    colorAgro: {
        color: theme.palette.colorStyles.positiveAlert,
    },
    colorMeteo: {
        color: theme.palette.colorStyles.negativeAlert,
    },
    colorSoil: {
        color: theme.palette.colorStyles.mediumStatus,
    },
    subCardContent: {
        width: "100%",
        paddingBottom: "16px !important",
    },
    subCardTitle: {
        fontWeight: "500",
    },
    subCardDate: {
        fontWeight: "200",
        paddingLeft: "inherit",
    },
}))

const ClimateOverview = (props) => {
    const { className, data, feed_name } = props

    const classes = useStyles()

    return (
        <Card className={`${classes.root} ${className}`}>
            <CardContent className={classes.cardContent}>
                <Typography align="left" variant="h4">
                    {feed_name ? feed_name : "Alert Feed"}
                </Typography>

                <Divider className={classes.divider} />

                {data.map((message, index) => {
                    const colorLabel =
                        message.type === "agronomic"
                            ? "colorLabelAgro"
                            : message.type === "meteo"
                            ? "colorLabelMeteo"
                            : "colorLabelSoil"
                    // switch
                    const fontColor =
                        message.alert && message.type === "agronomic"
                            ? "colorAgro"
                            : message.alert && message.type === "meteo"
                            ? "colorMeteo"
                            : message.alert && message.type === "soil"
                            ? "colorSoil"
                            : ""

                    return (
                        <Fragment key={index}>
                            <Typography className={classes.subCardDate} align="left" variant="h6">
                                {message.date}
                            </Typography>
                            <Card className={classes.subCard}>
                                <div className={`${classes.colorLabel} ${classes[colorLabel]}`} />
                                <CardContent className={classes.subCardContent}>
                                    <Grid container justify="space-between">
                                        <Typography className={classes.subCardTitle} align="left" variant="body2">
                                            {message.title}
                                        </Typography>
                                        <Typography align="left" variant="body2">
                                            {message.time}
                                        </Typography>
                                    </Grid>
                                    <Typography className={classes[fontColor]} align="left" variant="caption">
                                        {message.description}
                                    </Typography>
                                    {message.temperature && (
                                        <Fragment>
                                            <br />
                                            <Typography align="left" variant="caption">
                                                {message.temperature}
                                            </Typography>
                                        </Fragment>
                                    )}
                                    {message.precipitation && (
                                        <Fragment>
                                            <br />
                                            <Typography align="left" variant="caption">
                                                {message.precipitation}
                                            </Typography>
                                        </Fragment>
                                    )}
                                </CardContent>
                            </Card>
                        </Fragment>
                    )
                })}
            </CardContent>
        </Card>
    )
}

ClimateOverview.propTypes = {
    className: PropTypes.string,
    temperature: PropTypes.number,
}

export default ClimateOverview
