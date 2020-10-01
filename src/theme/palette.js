import { colors } from "@material-ui/core"

const white = "#FFFFFF"
const black = "#000000"

export default {
    colorStyles: {
        gradientCards: {
            background: "linear-gradient(131.47deg, #F8FBFF 7.84%, #EFF2F6 93.19%)",
        },
        gradientFreeze: {
            background: "linear-gradient(180deg, #00CDFF 0.39%, rgba(196, 196, 196, 0) 141.86%)",
        },
        inactiveIcon: "#8A9198",
        activeIcon: "#384E63",
        normalStatus: "#74A731",
        negativeAlert: "#FF3D3D",
        mediumStatus: "#FFBD3D", // medium alert, need to change name
        positiveAlert: "#22C11F",
        climateGreen: "#1F9992",
        gneralGrey: "#404040",
        orangeClimate: "#F27930",
        overMenuBar: "#AAE0DF",
        darkBlue: "#1D2934",
        redGraphGrowing: "#DA3849",
        yellowGraphGrowing: "#E5A339",
        yellowWind: "#FAAA11",
        bluePrecipitation: "#2288C1",
        okAlert: "#FFFFFF",
    },
    effectStyles: {
        backGlowCards: {
            boxShadow: "0px 4px 10px #C0D2E4",
        },
        mediumGlowCards: {
            boxShadow: "0px 4px 10px rgba(255, 154, 61, 0.44)",
        },
        positiveGlowCards: {
            boxShadow: "0px 4px 10px rgba(116, 167, 49, 0.44)",
        },
        negativeGlowCards: {
            boxShadow: "0px 4px 10px rgba(255, 61, 61, 0.44)",
        },
    },
    black,
    white,
    primary: {
        contrastText: white,
        dark: colors.indigo[900],
        main: colors.indigo[500],
        light: colors.indigo[100],
    },
    secondary: {
        contrastText: white,
        dark: colors.blue[900],
        main: colors.blue["A400"],
        light: colors.blue["A400"],
    },
    success: {
        contrastText: white,
        dark: colors.green[900],
        main: colors.green[600],
        light: colors.green[400],
    },
    info: {
        contrastText: white,
        dark: colors.blue[900],
        main: colors.blue[600],
        light: colors.blue[400],
    },
    warning: {
        contrastText: white,
        dark: colors.orange[900],
        main: colors.orange[600],
        light: colors.orange[400],
    },
    error: {
        contrastText: white,
        dark: colors.red[900],
        main: colors.red[600],
        light: colors.red[400],
    },
    text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600],
        link: colors.blue[600],
    },
    background: {
        default: "#F4F6F8",
        paper: white,
    },
    icon: colors.blueGrey[600],
    divider: colors.grey[200],
}
