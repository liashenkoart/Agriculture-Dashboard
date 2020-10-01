import React, { useEffect, useState } from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import { Typography } from "@material-ui/core"
import SwapIcon from "@material-ui/icons/SwapHoriz"
import app from "../../../../../../Util/Fire"
import networking from "../../../../../../Util/Networking"
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "fit-content",
    },
    name: {
        padding: "8px 0",
    },
}))

const Profile = (props) => {
    const { fieldName, className, ...rest } = props

    const classes = useStyles()
    const [time, setTime] = React.useState(0)
    const [currentUser, setCurrentUser] = useState(null)
    const [fieldN, setField] = useState(localStorage.getItem(fieldName + "-FieldName") || "Field")
    useEffect(() => {
        app.auth().onAuthStateChanged(setCurrentUser)
    }, [])

    useEffect(() => {
        if (currentUser !== null) {
            app.auth()
                .currentUser.getIdToken()
                .then((userToken) => {
                    networking
                        .get("/api/v1/fields/" + fieldName, {
                            extraHeaders: { "User-Token": userToken },
                        })
                        .then((res) => res.data)
                        .then((result) => {
                            let field_name = result.data.name
                            localStorage.setItem(fieldName + "-FieldName", field_name)
                            setField(field_name)
                        })
                        .catch((error) => {
                            console.log("FirstError")
                            console.log(error)
                            setField(fieldName)
                        })
                })
                .catch((error) => {
                    console.log("SecondError")
                    console.log(error)
                })
        }
    }, [currentUser])

    const getDate = () => {
        let date = new Date()
        let day = date.getDate()
        let normalizeDay = day < 10 ? "0" + day : day
        const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return monthArray[date.getMonth()] + "-" + normalizeDay + "-" + date.getFullYear()
    }

    const getTime = () => {
        let date = new Date()
        let hours = date.getHours()
        let min = date.getMinutes()
        let normalizeHour = hours < 10 ? "0" + hours : hours
        let normalizeMin = min < 10 ? "0" + min : min
        return normalizeHour + ":" + normalizeMin + " "
    }

    const getTimeUTC = () => {
        let date = new Date()
        let hours = date.getUTCHours()
        let min = date.getUTCMinutes()
        let normalizeHour = hours < 10 ? "0" + hours : hours
        let normalizeMin = min < 10 ? "0" + min : min
        return normalizeHour + ":" + normalizeMin + " "
    }

    const user = {
        name: fieldName,
        date: getDate(),
    }

    return (
        <div {...rest} className={clsx(classes.root, className)}>
            <Typography
                className={classes.name}
                variant="h4"
                style={{ backgroundColor: "#219992", width: "100%", textAlign: "center", color: "#fff" }}
            >
                {fieldN}
            </Typography>
            <div className={clsx(classes.root, className)} style={{ paddingTop: "16px" }}>
                <Typography variant="h5">{user.date}</Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h6">{time === 0 ? getTime() : getTimeUTC()}</Typography>
                    <Typography variant="h6" style={{ marginLeft: "5px" }}>
                        {time === 0 ? "Local" : "UTC"}
                    </Typography>
                    <SwapIcon
                        className={classes.icon}
                        onClick={() => {
                            setTime((prevState) => {
                                let newState = (prevState + 1) % 2
                                return newState
                            })
                        }}
                    />
                    <Typography variant="h6">{time === 0 ? "UTC" : "Local"}</Typography>
                </div>
            </div>
        </div>
    )
}

Profile.propTypes = {
    className: PropTypes.string,
}

export default Profile
