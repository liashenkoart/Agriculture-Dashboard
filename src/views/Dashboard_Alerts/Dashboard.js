// Import React
import React, { useEffect, useState } from "react"
// Import from libraries
import { makeStyles } from "@material-ui/styles"
import { useParams } from "react-router-dom"
import app from "../../Util/Fire"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import { PriorityView, LotView, DateView } from "./components"
const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}))

const Dashboard = () => {
    const classes = useStyles()

    const screens = [<PriorityView />, <DateView />, <LotView />]

    const [screen, setScreen] = React.useState(0)

    const handleChange = (event) => {
        setScreen(event.target.value)
    }

    return (
        <div className={`DASHBOARD-SECTION ${classes.root}`}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Sort By</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={screen}
                    onChange={handleChange}
                    label="Age"
                >
                    <MenuItem value={0}>Relevance</MenuItem>
                    <MenuItem value={1}>Date</MenuItem>
                    <MenuItem value={2}>Lot</MenuItem>
                </Select>
            </FormControl>
            {screens[screen]}
        </div>
    )
}

export default Dashboard
