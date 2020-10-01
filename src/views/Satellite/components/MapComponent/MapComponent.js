import React, { useEffect } from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import { Card, CardContent } from "@material-ui/core"
import ee from "@google/earthengine"
import { Loader } from "google-maps"

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        padding: "0",
        boxShadow: theme.palette.effectStyles.backGlowCards.boxShadow,
        borderRadius: "20px",
    },
    MapCardContent: {
        padding: "0",
        width: "100%",
        height: "100%",
    },
}))

const MapComponent = (props) => {
    const { info, className, ...rest } = props

    const classes = useStyles()

    const loadMap = async () => {
        const loader = new Loader("AIzaSyC5eVwmu49OCzKJcYsFhiWBCkAj2QxKK0s")
        const google = await loader.load()

        // const EE_MAP_PATH = "https://earthengine.googleapis.com/v1alpha"
        // let mapid = info.mapinfo.mapid
        // let token = info.mapinfo.token
        // const tileSource = new ee.layers.EarthEngineTileSource({
        //     mapid,
        //     token,
        //     formatTileUrl: (x, y, z) => `${EE_MAP_PATH}/${mapid}/tiles/${z}/${x}/${y}`,
        // })
        // const layer = new ee.layers.ImageOverlay(tileSource)

        const myLatLng = new google.maps.LatLng(info.center.lat, info.center.lon)
        const mapOptions = {
            center: myLatLng,
            zoom: 15,
            streetViewControl: false,
            mapTypeId: "satellite",
        }
        console.log("Created map")
        const coordinates = info.field_polygon.map((value) => {
            return { lat: value[1], lng: value[0] }
        })
        var field_circle = new google.maps.Polygon({
            paths: coordinates,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.1,
        })
        // Create the base Google Map.
        const map = new google.maps.Map(document.getElementById("map"), mapOptions)
        // Add the EE layer to the map.

        // map.overlayMapTypes.push(layer)

        //
        if (coordinates.length !== 0) field_circle.setMap(map)
    }

    useEffect(() => {
        if (JSON.stringify(info) !== JSON.stringify({})) {
            loadMap()
        }
    }, [info])

    return (
        <Card {...rest} className={clsx(classes.root, className)}>
            <CardContent className={classes.MapCardContent}>
                <div
                    id="map"
                    style={{ backgroundColor: "grey", width: "100%", height: "100%", overflow: "initial" }}
                ></div>
            </CardContent>
        </Card>
    )
}

MapComponent.propTypes = {
    className: PropTypes.string,
    info: PropTypes.object,
}

export default MapComponent
