import React, { useState } from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import { makeStyles, useTheme } from "@material-ui/styles"
import { useMediaQuery, Grid } from "@material-ui/core"
import DashboardHeader from "../../components/DashboardHeader"
import { Sidebar, Footer } from "./components"
import { useParams } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 56,
        height: "100%",
        [theme.breakpoints.up("sm")]: {
            paddingTop: 64,
        },
    },
    shiftContent: {
        paddingLeft: "6vw",
        paddingRight: "6vw",
    },
    content: {
        height: "100%",
        // display: 'flex'
    },
    icon: {
        height: 24,
        width: 24,
    },
    sidebarRoot: {
        paddingTop: theme.spacing(4),
    },
}))

const Main = (props) => {
    const { children } = props
    let { id } = useParams()
    const classes = useStyles()
    const theme = useTheme()
    const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
        defaultMatches: true,
    })

    const [openSidebar, setOpenSidebar] = useState(false)

    const handleSidebarOpen = () => {
        setOpenSidebar(true)
    }

    const handleSidebarClose = () => {
        setOpenSidebar(false)
    }

    const shouldOpenSidebar = isDesktop ? true : openSidebar

    return (
        <div
            className={clsx({
                [classes.root]: true,
                [classes.shiftContent]: isDesktop,
            })}
        >
            <DashboardHeader showLogout={true} hasBack={true} />
            <main className={classes.content}>
                <Grid container>
                    <Grid item lg={2} className={classes.sidebarRoot}>
                        <Sidebar
                            onClose={handleSidebarClose}
                            open={shouldOpenSidebar}
                            variant={isDesktop ? "persistent" : "temporary"}
                            fieldName={id}
                        />
                    </Grid>
                    <Grid item lg={10}>
                        {children}
                    </Grid>
                </Grid>
            </main>
            <Footer />
        </div>
    )
}

Main.propTypes = {
    children: PropTypes.node,
}

export default Main
