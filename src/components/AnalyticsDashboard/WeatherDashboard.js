import React from 'react';

export default function ReceiveTest() {
   

    return (
        <div id = "container">
            <h1> WEATHER </h1>
            <div id = "topCard">
                <div id="temperatureCard">Temperature</div>
                <div id="windCard">Wind</div>
                <div id="precipitationCard">Precipitation</div>
                <div id="coldRiskCard">ColdRisk</div>
            </div>
            <div id="dailyForcast">
                Daily Forecast
            </div>
            <div id="seasonalForecast">
                Seasonal Forecast
            </div>
            <div id="map">
                Map 
            </div>

        </div>
    );
}