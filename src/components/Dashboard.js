import React from "react"
import { Link as RouterLink } from "react-router-dom"

import Link from "@material-ui/core/Link"
import Box from "@material-ui/core/Box"
import CssBaseline from "@material-ui/core/CssBaseline"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"

import Button from "@material-ui/core/Button"
import DashboardHeader from "./DashboardHeader"
import CropTable from "./CropTable"

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://www.climate.ai">
                Climate AI
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    )
}

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
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

export default function Dashboard() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <CssBaseline />
            <DashboardHeader showLogout={true} hasMenu={false} />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <CropTable />
                    {/* <RouterLink
                        to="/regionAlerts/Cavendish%20Farms-Linton,%20ND"
                        style={{ textDecoration: "none" }}
                        variant="body2"
                    >
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {"Go to Region View"}
                        </Button>
                    </RouterLink>

                    <Box pt={4}>
                        <Copyright />
                    </Box> */}
                </Container>
            </main>
        </div>
    )
}
