import React from "react"
import "./App.css"
import "./styles/chart.css"
import SignUp from "./components/SignUp"
import { AuthProvider } from "./Auth/Auth"
import PrivateRoute from "./Util/PrivateRoute"
import Dashboard from "./components/Dashboard"
import ReceiveTest from "./components/ReceiveTest"
import SignInSideBar from "./components/SignInSideBar"
import theme from "./theme"
import { ThemeProvider } from "@material-ui/styles"
import MainLayout from "./layouts/Main"
import { RouteWithLayout } from "./components"
import {
    Dashboard as DashboardView,
    Weather as WeatherView,
    Satellite as SatelliteView,
    Sustainability as SustainabilityView,
    LongTerm as LongTermView,
    Soil as SoilView,
    RegionAlerts as RegionView,
} from "./views"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { SettingsProvider } from "./Util/SettingsContext"
function App() {
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <SettingsProvider>
                            <Route exact path="/">
                                <SignInSideBar />
                            </Route>
                            <Route exact path="/signup">
                                <SignUp />
                            </Route>
                            <PrivateRoute exact path="/dashboard" component={Dashboard} />
                            <Route path="/dashboard/:id">
                                <ReceiveTest />
                            </Route>
                            <RouteWithLayout
                                name = 'regions'
                                component={RegionView}
                                exact
                                layout={MainLayout}
                                path="/regionAlerts/:id"
                            />
                            <RouteWithLayout component={DashboardView} name={'general'} exact layout={MainLayout} path="/general/:id" />
                            <RouteWithLayout component={WeatherView} name={'weather'} exact layout={MainLayout} path="/weather/:id" />
                            <RouteWithLayout
                                component={SatelliteView}
                                name={'satellite'}
                                exact
                                layout={MainLayout}
                                path="/satellite/:id"
                            />
                            <RouteWithLayout
                                component={SustainabilityView}
                                name={'sustainability'}
                                exact
                                layout={MainLayout}
                                path="/sustainability/:id"
                            />
                            <RouteWithLayout component={LongTermView} exact layout={MainLayout} path="/longterm/:id" />
                            <RouteWithLayout component={SoilView} exact layout={MainLayout} path="/soil/:id" />
                        </SettingsProvider>
                    </Switch>
                </Router>
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App
