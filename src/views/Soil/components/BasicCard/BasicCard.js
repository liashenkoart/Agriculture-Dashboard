// Import React
import React, { Fragment } from "react"
// Import Helpers
import loadAnimation from "../../../../helpers/loadingFunction"
//Import libraries
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import { Card, CardContent, Typography } from "@material-ui/core"
import CheckIcon from "@material-ui/icons/Check"
import ErrorIcon from "@material-ui/icons/ErrorOutline"

const useStyles = makeStyles((theme) => ({
    root: {
        height: "160px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxShadow: theme.palette.effectStyles.backGlowCards.boxShadow,
        textAlign: "center",
        borderRadius: "20px",
    },
    plantStage: {
        transform: "translateX(-50%)",
        left: "50%",
        position: "relative",
        width: "35px",
        lineHeight: "35px",
        margin: "8px 0",
        padding: "2px",
        color: theme.palette.white,
        backgroundColor: theme.palette.colorStyles.normalStatus,
        borderRadius: "100%",
        boxShadow: theme.palette.effectStyles.positiveGlowCards.boxShadow,
    },
    alert: {
        backgroundColor: theme.palette.colorStyles.positiveAlert,
    },
    icon: {
        margin: "8px 0",
        padding: "2px",
        color: theme.palette.white,
        backgroundColor: theme.palette.colorStyles.normalStatus,
        borderRadius: "100%",
        boxShadow: theme.palette.effectStyles.positiveGlowCards.boxShadow,
    },
    iconred: {
        margin: "8px 0",
        padding: "2px",
        color: theme.palette.white,
        backgroundColor: theme.palette.colorStyles.negativeAlert,
        borderRadius: "100%",
        boxShadow: theme.palette.effectStyles.positiveGlowCards.boxShadow,
    },
    title: {
        height: "40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
}))

const BasicCard = (props) => {
    const classes = useStyles()

    const {
        className,
        plantStage = false, // default to false, depending on the logic this could be a number
        alert = false, // default false
        title,
        subtitle,
        status,
    } = props

    return (
        <Card className={`BASIC-CARD ${className} ${classes.root}`}>
            <CardContent>
                {loadAnimation(
                    title,
                    true,
                    <Fragment>
                        <Typography className={classes.title} align="center" variant="h5">
                            {title}
                        </Typography>
                        <Typography className={classes.bottomStyle} align="center" variant="body2">
                            {subtitle}
                        </Typography>
                        {plantStage ? (
                            <ErrorIcon className={classes.iconred} fontSize="large" />
                        ) : (
                            <CheckIcon className={classes.icon} fontSize="large" />
                        )}
                        <Typography align="center" variant="body2">
                            {status}
                        </Typography>
                    </Fragment>
                )}
            </CardContent>
        </Card>
    )
}

export default BasicCard

BasicCard.propTypes = {
    className: PropTypes.string,
    cropName: PropTypes.string,
}
