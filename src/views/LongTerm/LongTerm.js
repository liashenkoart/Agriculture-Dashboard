// Import React
import React from "react"
// Import from libraries
import { makeStyles } from "@material-ui/styles"
import PlaceHolder from "./components/LongTerm.png"

// Import components

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
}))

const LongTerm = () => {
    const classes = useStyles()

    return (
        <div
            style={{ background: "linear-gradient(158.43deg, #F8FBFF 7.84%, #EFF2F6 93.19%)" }}
            className={`LONGTERM-SECTION ${classes.root}`}
        >
            <img src={PlaceHolder} style={{ height: "100%" }} alt={"Temporary placeholder for longterm dashboard"} />
        </div>
    )
}

export default LongTerm
