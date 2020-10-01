import React, { useEffect, useState } from "react"
import app from "../Util/Fire.js"

export const AuthContext = React.createContext(null)

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [pending, setPending] = useState(true)

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            setPending(false)
        })
    }, [])

    if (pending) {
        return <></>
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
