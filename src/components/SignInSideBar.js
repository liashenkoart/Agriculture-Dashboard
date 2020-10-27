import React, { useCallback, useContext } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Paper from "@material-ui/core/Paper"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import DashboardHeader from "./DashboardHeader"
import app from "../Util/Fire"
import { AuthContext } from "../Auth/Auth"
import { Link as RouterLink } from "react-router-dom"
import { Redirect, withRouter } from "react-router"

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

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
    },
    grid: {
        height: "100%",
    },
    image: {
        backgroundImage: "url(/images/sign_in.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundColor: theme.palette.type === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    container: {},
}))

const SignInSideBar = ({ history }) => {
    const classes = useStyles()

    const handleLogin = useCallback(
        async (event) => {
            event.preventDefault()
            const { email, password } = event.target.elements
            try {
                await app.auth().signInWithEmailAndPassword(email.value, password.value)
                history.push("/dashboard")
            } catch (error) {
                alert(error)
            }
        },
        [history]
    )
    const { currentUser } = useContext(AuthContext)

    if (currentUser) {
        return <Redirect to="/dashboard" />
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <DashboardHeader showLogout={false} hasMenu={false} />
            <main className={classes.content} >
                <div className={classes.appBarSpacer} />
                <Grid container component="main" style={{ flexgrow: 1 }} className={classes.grid}>
                    <Grid item xs={false} sm={4} md={7} className={classes.image} />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <form className={classes.form} noValidate onSubmit={handleLogin}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <RouterLink to="/signup" style={{ textDecoration: "none" }} variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </RouterLink>
                                    </Grid>
                                </Grid>
                                <Box mt={5}>
                                    <Copyright />
                                </Box>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </main>
        </div>
    )
}

export default withRouter(SignInSideBar)
