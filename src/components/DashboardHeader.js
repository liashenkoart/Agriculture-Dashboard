import AppBar from "@material-ui/core/AppBar"
import clsx from "clsx"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import MailIcon from "@material-ui/icons/Mail"
import app from "../Util/Fire"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { Link as RouterLink } from "react-router-dom"
import BackIcon from "@material-ui/icons/ArrowBack"

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",

        padding: "0 8px",
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: "none",
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    fixedHeight: {
        height: 240,
    },
}))

export default function Dashboard({ handleDrawerOpen, open, showLogout, hasMenu, hasBack }) {
    const classes = useStyles()

    return (
        <AppBar style={{ background: "#F27930" }} className={clsx(classes.appBar)}>
            <Toolbar className={classes.toolbar}>
                {hasMenu && (
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                {hasBack && (
                    <RouterLink to="/dashboard">
                        <IconButton color="inherit" style={{ justifyContent: "flex-end" }}>
                            <BackIcon style={{ color: "white" }} />
                        </IconButton>
                    </RouterLink>
                )}
                <div style={{ justifyContent: "flex-start" }} className={classes.title}>
                    <img src={window.location.origin + "/ClimateAILogo.png"} height={30} alt={"ClimateAI Logo"} />
                </div>
                <div style={{ justifyContent: "flex-end", flexDirection: "row" }}>
                    <Typography component="h1" style={{ alignSelf: "flex-end" }} variant="h6" color="inherit" noWrap>
                        Contact Us
                    </Typography>
                </div>
                <IconButton color="inherit" style={{ justifyContent: "flex-end" }} onClick={() => app.auth().signOut()}>
                    <MailIcon />
                </IconButton>
                {showLogout && (
                    <IconButton
                        color="inherit"
                        style={{ justifyContent: "flex-end" }}
                        onClick={() => app.auth().signOut()}
                    >
                        <ExitToAppIcon />
                    </IconButton>
                )}
            </Toolbar>
        </AppBar>
    )
}
