import React from "react"
import PropTypes from "prop-types"
//import clsx from 'clsx';
import { makeStyles } from "@material-ui/styles"
import { Typography, Link } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
}))

const Footer = (props) => {
    const { className, ...rest } = props

    //const classes = useStyles();

    return (
        <div style={{ marginBottom: 20 }}>
            <Typography variant="body2" color="textSecondary" align="center">
                {"Copyright © "}
                <Link color="inherit" href="https://www.climate.ai">
                    Climate AI
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
            </Typography>
        </div>
    )
}

Footer.propTypes = {
    className: PropTypes.string,
}

export default Footer
