// Import React
import React from "react"

// Import
import { Profile, SidebarNav } from "./components"

// Import from Libraries
import clsx from "clsx"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import { Divider, Drawer, Card, Grid } from "@material-ui/core"
import SettingsIcon from "@material-ui/icons/Settings"
import CloudIcon from "@material-ui/icons/Cloud"
import EcoIcon from "@material-ui/icons/Eco"
import PublicIcon from "@material-ui/icons/Public"
import NatureIcon from "@material-ui/icons/Nature"
import WatchLaterIcon from "@material-ui/icons/WatchLater"

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.white,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxShadow: theme.palette.effectStyles.backGlowCards.boxShadow,
        borderRadius: "20px",
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
    nav: {
        marginBottom: theme.spacing(2),
    },
}))

const Sidebar = (props) => {
    const { className, fieldName, open, variant, onClose } = props

    const classes = useStyles()

    const pages = [
        {
            title: "General",
            href: "/general/" + fieldName,
            icon: <SettingsIcon />,
        },
        {
            title: "Weather",
            href: "/weather/" + fieldName,
            icon: <CloudIcon />,
        },
        /*        {
            title: "Soil",
            href: "/soil/" + fieldName,
            icon: <EcoIcon />,
        },*/
        {
            title: "Satellite",
            href: "/satellite/" + fieldName,
            icon: <PublicIcon />,
        },
        /*        {
            title: "Sustainability",
            href: "/sustainability/" + fieldName,
            icon: <NatureIcon />,
        },
        {
            title: "Long Term",
            href: "/longterm/" + fieldName,
            icon: <WatchLaterIcon />,
        },*/
    ]

    return (
        <Card className={clsx(classes.root, className)}>
            <Profile fieldName={fieldName} />
            <Divider className={classes.divider} />
            <SidebarNav className={classes.nav} pages={pages} />
        </Card>
    )
}

Sidebar.propTypes = {
    className: PropTypes.string,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    variant: PropTypes.string.isRequired,
}

export default Sidebar
