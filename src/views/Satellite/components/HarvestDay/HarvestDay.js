import React from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import { Avatar, Card, CardContent, Divider, Grid, Typography } from "@material-ui/core"
import Equalizer from "@material-ui/icons/Equalizer"
import GradeRounded from "@material-ui/icons/GradeRounded"

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
    EqualizerIcon: {
        color: theme.palette.success.main,
        height: 32,
        width: 32,
    },
    StarIcon: {
        color: theme.palette.warning.light,
        height: 32,
        width: 32,
    },
}))

const HarvestDay = (props) => {
    const { className, ...rest } = props

    const classes = useStyles()

    return (
        <Card {...rest} className={clsx("planting-date-card", classes.root, className)}>
            <CardContent>
                {" "}
                {/* Bottom padding is 1.5 times bigger, 24px */}
                <Grid container spacing={3}>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <Equalizer className={classes.EqualizerIcon} />
                        </Avatar>
                    </Grid>
                    <Grid item>
                        <Grid item container direction="column" justify="center" style={{ height: "100%" }}>
                            <Typography variant="h4">Day 45</Typography>
                            <Typography variant="body1">Growing Stage</Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Divider orientation="vertical" flexItem style={{ height: "100%", width: "2px" }} />
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <GradeRounded className={classes.StarIcon} />
                        </Avatar>
                    </Grid>
                    <Grid item>
                        <Grid item container direction="column" justify="center" style={{ height: "100%" }}>
                            <Typography variant="h4">00.00.0000</Typography>
                            <Typography variant="body1">Expected Harvest Day</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

HarvestDay.propTypes = {
    className: PropTypes.string,
}

export default HarvestDay
