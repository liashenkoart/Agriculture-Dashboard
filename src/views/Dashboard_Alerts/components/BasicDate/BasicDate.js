// Import React
import React, { Fragment } from "react"
// Import Helpers
import loadAnimation from "../../../../helpers/loadingFunction"
//Import libraries
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import { Card, CardContent, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "160px",
        flexDirection: "column",
        justifyContent: "center",
        display: "flex",
        boxShadow: theme.palette.effectStyles.backGlowCards.boxShadow,
        borderRadius: "20px",
    },
    CardContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    date: {
        fontWeight: "900",
        width: "min-content",
        margin: "8px 0 0 0",
    },
    opacity: {
        opacity: "0.3",
    },
}))

const BasicDate = (props) => {
    const classes = useStyles()

    const { className, title, date, opacity = false } = props

    const sanitizeDate = (date) => {
        // could use moment JS for all the time manipulation, left untoched
        if (date === true) {
            return ""
        }
        if (date.split("/").length < 2) {
            return date
        }
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let parts = date.split("/")
        return "" + parts[1] + " " + months[parseInt(parts[0]) - 1] + " " + parts[2]
    }

    return (
        <Card className={`DATE-CARD ${className} ${classes.root}`}>
            <CardContent className={classes.CardContent}>
                {loadAnimation(
                    date,
                    true,
                    <Fragment>
                        <Typography className={classes.fontColor} align="center" variant="h5">
                            {title}
                        </Typography>
                        <Typography
                            className={`${classes.date} ${opacity && classes.opacity}`}
                            align="center"
                            variant="h4"
                        >
                            {sanitizeDate(date)}
                        </Typography>
                    </Fragment>
                )}
            </CardContent>
        </Card>
    )
}

export default BasicDate

BasicDate.propTypes = {
    className: PropTypes.string,
    date: PropTypes.string,
}
