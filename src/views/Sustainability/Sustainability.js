// Import React
import React from "react"
// Import from libraries
import { makeStyles } from "@material-ui/styles"
import PlaceHolder from "./components/Sustainability.png"

// Import components

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
}))

const Sustainability = () => {
    const classes = useStyles()

    return (
        <div
            style={{ background: "linear-gradient(158.43deg, #F8FBFF 7.84%, #EFF2F6 93.19%)" }}
            className={`SUSTAINABILITY-SECTION ${classes.root}`}
        >
            <img src={PlaceHolder} alt={"Temporary placeholder for sustainability dashboard"} />
        </div>
    )
}

export default Sustainability
