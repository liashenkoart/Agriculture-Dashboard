// Import React
import React from "react"
//Import libraries
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import { Card, CardContent, Divider, Grid, Typography } from "@material-ui/core"
import Stage0 from "./images/POTATO_STAGE_0.png"
import Stage1 from "./images/POTATO_STAGE_1.png"
import Stage2 from "./images/POTATO_STAGE_2.png"
import Stage3 from "./images/POTATO_STAGE_3.png"
import Stage4 from "./images/POTATO_STAGE_4.png"

const useStyles = makeStyles((theme) => ({
    root: {
        height: "288px",
        boxShadow: theme.palette.effectStyles.backGlowCards.boxShadow,
        borderRadius: "20px",
        position: "relative",
    },
    cardContent: {
        height: "calc(100% - 32px)",
    },
    stages: {
        height: "208px",
        width: "calc(100%/5)",
        marginTop: "10px",
        opacity: 0.5,
    },
    activeStage: {
        opacity: 1,
    },
    stageLabelsContainer: {
        backgroundColor: "#384E63",
        position: "absolute",
        bottom: "0",
        padding: "8px 0",
    },
    stageLabels: {
        fontWeight: "600",
    },
    activeStageLabel: {
        color: "white",
    },
    inactiveStageLabel: {
        color: "#9CB6CE",
    },
    divider: {
        width: "calc(100% - 48px)",
        position: "absolute",
        bottom: "70px",
        backgroundColor: "#C0D2E4",
        margin: "0 8px",
    },
}))

const GrowStage = (props) => {
    const classes = useStyles()

    const { growthStage, className } = props
    const growth_styles = [
        growthStage === 1 ? classes.activeStage : "",
        growthStage === 2 ? classes.activeStage : "",
        growthStage === 3 ? classes.activeStage : "",
        growthStage === 4 ? classes.activeStage : "",
        growthStage === 5 ? classes.activeStage : "",
    ]

    const growth_styles_text = [
        growthStage === 1 ? classes.activeStageLabel : classes.inactiveStageLabel,
        growthStage === 2 ? classes.activeStageLabel : classes.inactiveStageLabel,
        growthStage === 3 ? classes.activeStageLabel : classes.inactiveStageLabel,
        growthStage === 4 ? classes.activeStageLabel : classes.inactiveStageLabel,
        growthStage === 5 ? classes.activeStageLabel : classes.inactiveStageLabel,
    ]
    return (
        <Card className={`${classes.root} ${className}`}>
            <CardContent className={classes.cardContent}>
                <Typography className="TITLE" variant="h5">
                    Growth Stage
                </Typography>
                <Grid className="STAGES-CONTAINER-GRID" container>
                    {/* Add mapping logic if necessary */}
                    <Grid
                        // Add active class logic
                        className={`GROWING-STAGE ${classes.stages} ${growth_styles[0]}`}
                        item
                        container
                        alignItems="center"
                        justify="center"
                    >
                        <img src={Stage0} style={{ height: "100%" }} alt={"Planting stage of a plant"} />
                    </Grid>
                    <Grid
                        className={`${classes.stages} ${growth_styles[1]}`}
                        item
                        container
                        alignItems="center"
                        justify="center"
                    >
                        <img src={Stage1} style={{ height: "100%" }} alt={"Emergence stage of a plant"} />
                    </Grid>
                    <Grid
                        className={`${classes.stages} ${growth_styles[2]}`}
                        item
                        container
                        alignItems="center"
                        justify="center"
                    >
                        <img src={Stage2} style={{ height: "100%" }} alt={"Canopy closure stage of a plant"} />
                    </Grid>
                    <Grid
                        className={`${classes.stages} ${growth_styles[3]}`}
                        item
                        container
                        alignItems="center"
                        justify="center"
                    >
                        <img src={Stage3} style={{ height: "100%" }} alt={"Senescence stage of a plant"} />
                    </Grid>
                    <Grid
                        className={`${classes.stages} ${growth_styles[4]}`}
                        item
                        container
                        alignItems="center"
                        justify="center"
                    >
                        <img src={Stage4} style={{ height: "100%" }} alt={"Harvest stage of a plant"} />
                    </Grid>
                </Grid>
                <Divider className={classes.divider} />
            </CardContent>
            <Grid className={`STAGE-LABELS ${classes.stageLabelsContainer}`} container justify="space-evenly">
                {/* Add mapping logic for the labels */}
                <Grid item>
                    {/* Add selecting logic for the active labels */}
                    <Typography className={`${growth_styles_text[0]} ${classes.stageLabels}`} variant="body2">
                        Planting
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography className={`${growth_styles_text[1]} ${classes.stageLabels}`} variant="body2">
                        Emergence
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography className={`${growth_styles_text[2]} ${classes.stageLabels}`} variant="body2">
                        Canopy Closure
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography className={`${growth_styles_text[3]} ${classes.stageLabels}`} variant="body2">
                        Senescence
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography className={`${growth_styles_text[4]} ${classes.stageLabels}`} variant="body2">
                        Harvest
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    )
}

GrowStage.propTypes = {
    className: PropTypes.string,
    fieldNotes: PropTypes.string,
}

export default GrowStage
