import React from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import { Avatar, Card, CardContent, Grid, Typography } from "@material-ui/core"
import Whatshot from "@material-ui/icons/Whatshot"

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
    avatar: {
        backgroundColor: theme.palette.divider,
        height: 56,
        width: 56,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    },
    icon: {
        color: theme.palette.warning.main,
        height: 32,
        width: 32,
    },
}))

const GDDAccumulation = (props) => {
    const { className, ...rest } = props

    const classes = useStyles()

    return (
        <Card {...rest} className={clsx("planting-date-card", classes.root, className)}>
            <CardContent>
                {" "}
                {/* Bottom padding is 1.5 times bigger, 24px */}
                <Grid container direction="column">
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <Whatshot className={classes.icon} />
                        </Avatar>
                    </Grid>
                    <Grid item container direction="column" alignContent="flex-end">
                        <Grid item>
                            <Typography align="right" variant="h4">
                                3923
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography align="right" variant="body1">
                                GDD Accumulation
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

GDDAccumulation.propTypes = {
    className: PropTypes.string,
}

export default GDDAccumulation
