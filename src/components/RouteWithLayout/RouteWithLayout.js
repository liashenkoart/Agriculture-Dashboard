import React, { useContext } from "react"
import { Redirect, Route } from "react-router-dom"
import PropTypes from "prop-types"
import { AuthContext } from "../../Auth/Auth"

const RouteWithLayout = (props) => {
    const { name: Name, layout: Layout, component: Component, ...rest } = props
    const { currentUser, permissions} = useContext(AuthContext)
    // TODO make a better logical expression so that all of the conditions are met
    return (
        <Route
            {...rest}
            render={(matchProps) =>
                !!currentUser ? (Name in permissions) ? permissions[Name]? (
                    <Layout>
                        <Component {...matchProps} />
                    </Layout>
                ): (
                    <Redirect to={"/"} />
                ): (
                    <Redirect to={"/"} />
                ): (
                    <Redirect to={"/"} />
                )
            }
        />
    )
}

RouteWithLayout.propTypes = {
    component: PropTypes.any.isRequired,
    layout: PropTypes.any.isRequired,
    path: PropTypes.string,
}

export default RouteWithLayout
