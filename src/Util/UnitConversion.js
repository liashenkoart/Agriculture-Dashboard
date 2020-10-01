export const convertTemperature = (originalUnits, wantedUnits, value) => {
    let baseValue = value
    if (originalUnits !== "metric") {
        baseValue = ((value - 32) * 5) / 9
    }
    if (wantedUnits === "imperial") {
        let converted = (baseValue * 9) / 5 + 32
        let formatted = converted.toFixed(1)
        return formatted + "°F"
    }
    return baseValue.toFixed(1) + "°C"
}

export const convertFromCelsius = (wantedUnits, value) => {
    return convertTemperature("metric", wantedUnits, value)
}

export const convertFromFahren = (wantedUnits, value) => {
    return convertTemperature("imperial", wantedUnits, value)
}

export const convertSpeed = (originalUnits, wantedUnits, value) => {
    let baseValue = value
    if (originalUnits !== "metric") {
        baseValue = value * 1.609
    }
    if (wantedUnits === "imperial") {
        let converted = baseValue / 1.609
        let formatted = converted.toFixed(2)
        return formatted + " mi/h"
    }
    return baseValue.toFixed(2) + " k/h"
}

export const convertFromKmH = (wantedUnits, value) => {
    return convertSpeed("metric", wantedUnits, value)
}

export const convertFromCelsiusNum = (wantedUnits, value) => {
    let convertedTemp = convertTemperature("metric", wantedUnits, value)
    return parseInt(convertedTemp.slice(0, -2))
}

export const convertFromMPH = (wantedUnits, value) => {
    return convertSpeed("imperial", wantedUnits, value)
}

export const convertWaterLength = (originalUnits, wantedUnits, value) => {
    let baseValue = value
    if (originalUnits !== "metric") {
        baseValue = value * 25.14
    }
    if (wantedUnits === "imperial") {
        let converted = baseValue / 25.4
        let formatted = converted.toFixed(2)
        return formatted + " in"
    }
    return baseValue.toFixed(1) + " mm"
}

export const convertFromMM = (wantedUnits, value) => {
    return convertWaterLength("metric", wantedUnits, value)
}

export const convertFromM = (wantedUnits, value) => {
    value = value * 1000
    let convertedRain = convertWaterLength("metric", wantedUnits, value)
    return parseFloat(convertedRain.slice(0, -2))
}

export const convertGDD = (originalUnits, wantedUnits, value) => {
    let baseValue = value
    if (wantedUnits === "imperial") {
        // Max said that the constant +32 wasn't neccesary
        let converted = (baseValue * 9) / 5 + 32
        let formatted = converted.toFixed(2)
        converted = Number(formatted)
        return converted
    }
    return Number(baseValue.toFixed(1))
}

export const convertGDDFromMetric = (wantedUnits, value) => {
    return convertGDD("metric", wantedUnits, value)
}
