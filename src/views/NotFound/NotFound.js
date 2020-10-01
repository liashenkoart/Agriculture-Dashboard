import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Grid, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
    content: {
        paddingTop: 150,
        textAlign: "center",
    },
    image: {
        marginTop: 50,
        display: "inline-block",
        maxWidth: "100%",
        width: 560,
    },
}))

const NotFound = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Grid container justify="center" spacing={4}>
                <Grid item lg={6} xs={12}>
                    <div className={classes.content}>
                        <img src="Climate-AI-Color-Logo.png" height="70" alt="ClimateAI Logo" />
                        <Typography variant="h1">404: The page you are looking for isn’t here.</Typography>
                        <Typography variant="subtitle2">Please check the URL and try again.</Typography>
                        <img
                            alt="Under development"
                            className={classes.image}
                            src="https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_960_720.jpg"
                        />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default NotFound
