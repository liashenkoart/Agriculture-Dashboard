import React, { useEffect, useState } from "react"
import app from "../Util/Fire.js"
import networking from "../Util/Networking"

export const AuthContext = React.createContext(null)

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [pending, setPending] = useState(true)
    const [permissions, setPermissions] = useState(null)

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            setPending(false)
            if (user!==null) {
                user.getIdToken().then((token) => {
                        networking
                            .get("/api/v1/settings/permissions", { extraHeaders: { "User-Token": token } })
                            .then((res) => res.data)
                            .then((result) => {
                                setPermissions(result)
                            })
                            .catch((error) => {
                                console.log('There was a problem obtaining permissions')
                            })
                    }
                )
            }
        })
    }, [])

    if (pending) {
        return <></>
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                permissions
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
