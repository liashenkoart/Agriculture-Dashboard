const local = {
    backend_server: "http://0.0.0.0:8080",
    firebase: {
        apiKey: "AIzaSyA7xoASmah7_N-eUGd-2hbRQxEthpe9myk",
        authDomain: "climate-ai.firebaseapp.com",
        databaseURL: "https://climate-ai.firebaseio.com",
        projectId: "climate-ai",
        storageBucket: "climate-ai.appspot.com",
        messagingSenderId: "729834109362",
        appId: "1:729834109362:web:ac81cdd4f593032ad20cab",
        measurementId: "G-3EVMJJSN0E",
    },
}

const dev = {
    backend_server: "https://dev.climate.ai",
    firebase: {
        apiKey: "AIzaSyA7xoASmah7_N-eUGd-2hbRQxEthpe9myk",
        authDomain: "climate-ai.firebaseapp.com",
        databaseURL: "https://climate-ai.firebaseio.com",
        projectId: "climate-ai",
        storageBucket: "climate-ai.appspot.com",
        messagingSenderId: "729834109362",
        appId: "1:729834109362:web:ac81cdd4f593032ad20cab",
        measurementId: "G-3EVMJJSN0E",
    },
}

const staging = {
    backend_server: "https://staging.climate.ai",
    firebase: {
        apiKey: "AIzaSyDujAO3MFfEfn8m-UdRpvwfSlYME38Gn_w",
        authDomain: "climateai-staging-dashboard.firebaseapp.com",
        databaseURL: "https://climateai-staging-dashboard.firebaseio.com",
        projectId: "climateai-staging-dashboard",
        storageBucket: "climateai-staging-dashboard.appspot.com",
        messagingSenderId: "749123888473",
        appId: "1:749123888473:web:b0783f9860b76adfd81848",
        measurementId: "G-TSWP9204MH",
    },
}

const production = {
    backend_server: "https://apis.climate.ai",
    firebase: {
        apiKey: "AIzaSyCJ4VsFMPT1Wzi5b7qmPZkxJmAPoxABVsI",
        authDomain: "climate-ai-prod-dashboard.firebaseapp.com",
        databaseURL: "https://climate-ai-prod-dashboard.firebaseio.com",
        projectId: "climate-ai-prod-dashboard",
        storageBucket: "climate-ai-prod-dashboard.appspot.com",
        messagingSenderId: "184350078364",
        appId: "1:184350078364:web:e7cd29cb6262a0f9300459",
        measurementId: "G-FL4V8FFG2L",
    },
}

const environments = {
    local: local,
    development: dev,
    staging: staging,
    production: production,
}

const config = environments[process.env.REACT_APP_STAGE]

export default {
    ...config,
}
