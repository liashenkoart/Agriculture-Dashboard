import React, { useEffect, useState } from "react"

export const SettingsContext = React.createContext(null)

export const SettingsProvider = ({ children }) => {
    const [currentSettings, setCurrentSettings] = useState({
        units: "imperial",
    })

    useEffect(() => {
        // Future load settings here
    }, [])

    return (
        <SettingsContext.Provider
            value={{
                currentSettings,
            }}
        >
            {children}
        </SettingsContext.Provider>
    )
}
