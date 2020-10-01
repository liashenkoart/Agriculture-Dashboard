import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

const loadAnimation = (loadingVariable,isLoadingValue,jsxToWrite) => {
    if(loadingVariable === isLoadingValue)
        return(<CircularProgress style={{display:'block',alignSelf:'center',alignContent:'center',justifySelf:'center'}} />)
    else
        return(jsxToWrite);
}

export default loadAnimation
