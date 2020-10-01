// Import React
import React, { useEffect } from "react"
// Import Librarie
import clsx from "clsx"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import { Card, Typography } from "@material-ui/core"
import CardMedia from "@material-ui/core/CardMedia"

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        boxShadow: theme.palette.effectStyles.backGlowCards.boxShadow,
        borderRadius: "20px",
        cursor: "pointer",
        position: "relative",
    },
    media: {
        // hacky way to make the iFrame conform to design, have to style the iframe directly for better results, pointer events none to use iFrame, or get rid of onClick
        height: "200%",
        width: "200%",
        position: "absolute",
        top: "-75px",
    },
    adornment: {
        position: "absolute",
        width: "90%",
        height: "56px",
        bottom: "0",
        margin: "0 5% 16px",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: "20px",
        opacity: "0.5",
    },
    typo: {
        position: "absolute",
        bottom: "48px",
        transform: "translateX(-50%)",
        left: "50%",
    },
    gradient: {
        position: "absolute",
        bottom: "28px",
        height: "16px",
        width: "84%",
        margin: "0 8%",
        background: "linear-gradient(to right, black, purple, blue, green, yellow, orange, red, brown)",
        borderRadius: "20px",
    },
    cursorArea: {
        position: "absolute",
        height: "100%",
        width: "100%",
    },
}))

const WeatherSideBar = (props) => {
    const { className, coord } = props

    const classes = useStyles()

    const [components, setComponents] = React.useState([])

    const truncateDegrees = (coordinate) => {
        let absolute = Math.abs(coordinate)
        let degrees = absolute.toFixed(2) + "°"
        return degrees
    }

    const convertDegrees = (coords) => {
        let lat = coords.lat
        let lng = coords.lon
        let latitude = truncateDegrees(lat)
        let latitudeCardinal = lat >= 0 ? "N" : "S"

        let longitude = truncateDegrees(lng)
        let longitudeCardinal = lng >= 0 ? "E" : "W"
        return latitude + " " + latitudeCardinal + ", " + longitude + " " + longitudeCardinal
    }

    const loadMap = (url_source, coords) => {
        let tempComp = [
            <CardMedia key={"CardMedia"} className={classes.media} component={"iframe"} src={url_source} />,
            <div key={"OverlayDiv"} className={classes.adornment} onClick={() => window.open(url_source, "_blank")} />,
            <Typography key={"Coordinates"} className={classes.typo} variant="body1" align="center">
                {convertDegrees(coords)}
            </Typography>,
            <div key={"GradientDiv"} className={classes.gradient} />,
            <div
                key={"ClickableDiv"}
                className={classes.cursorArea}
                onClick={() => window.open(url_source, "_blank")}
            />,
        ]
        setComponents(tempComp)
    }

    useEffect(() => {
        if (JSON.stringify(coord) !== JSON.stringify({})) {
            let formatURL =
                "https://demo.climate.ai/#current/wind/surface/level/overlay=temp/equirectangular=" +
                coord.lon +
                "," +
                coord.lat +
                ",10000"
            loadMap(formatURL, coord)
        }
    }, [coord])

    return <Card className={clsx(classes.root, className)}>{components}</Card>
}

WeatherSideBar.propTypes = {
    className: PropTypes.string,
    coord: PropTypes.object,
}

export default WeatherSideBar
