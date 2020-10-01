// Import React
import React from "react"
// Import Helpers
//Import libraries
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import { Card, CardContent, Divider, Typography } from "@material-ui/core"
import Stage2 from "../../../Dashboard/components/GrowStage/images/POTATO_STAGE_3.png"

const useStyles = makeStyles((theme) => ({
    root: {
        width: "inherit",
        display: "flex",
        boxShadow: theme.palette.effectStyles.backGlowCards.boxShadow,
        borderRadius: "20px",
        position: "relative",
        overflow: "auto",
    },
    cardContent: {
        width: "inherit",
    },
    divider: {
        margin: "4px 0 16px",
    },
    subCard: {
        display: "flex",
        margin: "4px 0 8px 0",
        boxShadow: theme.palette.effectStyles.backGlowCards.boxShadow,
    },
    colorLabel: {
        width: "4px",
    },
    colorLabelAgro: {
        backgroundColor: theme.palette.colorStyles.positiveAlert,
    },
    colorLabelMeteo: {
        backgroundColor: theme.palette.colorStyles.negativeAlert,
    },
    colorLabelSoil: {
        backgroundColor: theme.palette.colorStyles.mediumStatus,
    },
    colorAgro: {
        color: theme.palette.colorStyles.positiveAlert,
    },
    colorMeteo: {
        color: theme.palette.colorStyles.negativeAlert,
    },
    colorSoil: {
        color: theme.palette.colorStyles.mediumStatus,
    },
    subCardContent: {
        width: "100%",
        paddingBottom: "16px !important",
    },
    subCardTitle: {
        fontWeight: "500",
    },
    subCardDate: {
        fontWeight: "200",
        paddingLeft: "inherit",
    },
}))

const ClimateOverview = (props) => {
    const { className, stage } = props

    const classes = useStyles()

    return (
        <Card className={`${classes.root} ${className}`}>
            <CardContent className={classes.cardContent}>
                <Typography align="center" variant="h6">
                    Plant Stage
                </Typography>
                <Typography align="center" variant="h4">
                    {stage}
                </Typography>

                <Divider className={classes.divider} />
                <img
                    src={Stage2}
                    style={{ width: "100%", paddingBottom: "80px" }}
                    alt={"Current plant stage is " + stage}
                />
            </CardContent>
        </Card>
    )
}

ClimateOverview.propTypes = {
    className: PropTypes.string,
    temperature: PropTypes.number,
}

export default ClimateOverview
