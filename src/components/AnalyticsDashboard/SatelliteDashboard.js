import React from 'react';

export default function SatelliteDashboard() {
    return (
        <div id = "container">
            <h1>Satellite </h1>
           <div id="topRow">
               <div id="plantingDate">
                   Planting Date
               </div>

               <div id="GDDAccumulation">
                   GDDAccumulation
               </div>
               <div id="daysLeftToHarvest">
                   Days Left to Harvest
               </div>

           </div>
           <div id="secondRow">
           <div id="growingStage">
                   Growing Stage
               </div>
               <div id="exptectedHarvestDay">
                   Expected Harvest Day
               </div>

           </div>
           <div id="NDVI Chart">
               NDVI TabView
           </div>
           <div id="Map">
               Map
           </div>
        </div>
    );
}
