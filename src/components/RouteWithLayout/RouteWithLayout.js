import React, { useContext } from "react"
import { Redirect, Route } from "react-router-dom"
import PropTypes from "prop-types"
import { AuthContext } from "../../Auth/Auth"

const RouteWithLayout = (props) => {
    const { layout: Layout, component: Component, ...rest } = props
    const { currentUser } = useContext(AuthContext)

    return (
        <Route
            {...rest}
            render={(matchProps) =>
                !!currentUser ? (
                    <Layout>
                        <Component {...matchProps} />
                    </Layout>
                ) : (
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
