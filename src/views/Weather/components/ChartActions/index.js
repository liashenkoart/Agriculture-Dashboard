import React, { useState, useEffect } from 'react';
import { Card, Typography, Box } from '@material-ui/core';

import minMaxIcon from '../../../../assets/Chart/min-max.svg';
import CloudIcon from '../../../../assets/Chart/cloud.svg';
import SunIcon from '../../../../assets/Chart/sun.svg';
import OilIcon from '../../../../assets/Chart/oil.svg';
import DotIcon from '../../../../assets/Chart/dots.svg';
import Profile from '../../../../assets/Chart/profile.svg';

const ChartActions = ({ initialState, onStateChange }) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    onStateChange(state);
  }, [state]);
  return (
    <>
      <div className="title-container">
        <div className="desc-card">
          <div className="profileTextContainer">
            <Typography className="profile-bold">
              Crop: <span className="profile-light">Sorghum</span>
            </Typography>
            <Typography className="profile-bold">
              Extension: <span className="profile-light">80 Ha</span>
            </Typography>
          </div>
          <img src={Profile} alt=""/>
        </div>
      </div>
      <div className="headerBlocksContainer">
        <div className="blocks-container">
          <div className="textBlockContainer"
               style={{
                 marginBottom: 22,
                 boxShadow: !state.isMonthly ? '0px 4px 10px #E4A367' : ''
               }}
               onClick={() => {
                 setState({
                   ...state,
                   isMonthly: false,
                 })
               }}
          >
            <Typography className="textBlock">
              Daily
            </Typography>
          </div>
          {
            state.currentTab !== 'solltemp' && state.currentTab !== 'sollmolsture' ? (
              <div className="textBlockContainer"
                   style={{
                     marginBottom: 22,
                     boxShadow: state.isMonthly ? '0px 4px 10px #E4A367' : ''
                   }}
                   onClick={() => {
                     setState({
                       ...state,
                       isMonthly: true,
                     })
                   }}
              >
                <Typography className="textBlock">
                  Monthly
                </Typography>
              </div>
            ) : (
              <div className="textBlockContainer"
                   style={{
                     marginBottom: 22,
                     boxShadow: '0px 4px 10px rgba(56, 78, 99, 0.2)',
                     cursor: 'auto'
                   }}
              >
                <Typography className="textBlock">
                  Monthly
                </Typography>
              </div>
            )
          }
        </div>
        <div className="headerBlockContainer"
             style={{
               boxShadow: state.currentTab === 'minmax' ? '0px 4px 10px #E4A367' : ''
             }}
             onClick={() => {
               setState({
                 ...state,
                 currentTab: 'minmax',
               })
             }}
        >
          <Card className="headerBlock">
            <Box className="infoContainer">
              <img src={minMaxIcon}/>
            </Box>
            <Box className="infoContainer">
              <Typography className="titleText">
                Min & Max<br/>
                Temp
              </Typography>
            </Box>
          </Card>
        </div>
        <div className="headerBlockContainer"
             style={{
               boxShadow: state.currentTab === 'precipitation' ? '0px 4px 10px #E4A367' : ''
             }}
             onClick={() => {
               setState({
                 ...state,
                 currentTab: 'precipitation',
               })
             }}
        >
          <Card className="headerBlock">
            <Box className="infoContainer">
              <img src={CloudIcon}/>
            </Box>
            <Box className="infoContainer">
              <Typography className="titleText" style={{ marginBottom: 30 }}>
                Precipitation<br/>
              </Typography>
            </Box>
          </Card>
        </div>
        <div className="headerBlockContainer"
             style={{
               boxShadow: state.currentTab === 'solltemp' ? '0px 4px 10px #E4A367' : ''
             }}
             onClick={() => {
               setState({
                 ...state,
                 currentTab: 'solltemp',
               })
             }}
        >
          <Card className="headerBlock">
            <Box className="infoContainer">
              <img src={SunIcon}/>
            </Box>
            <Box className="infoContainer">
              <Typography className="titleText" style={{ marginBottom: 10 }}>
                Soll<br/> Temperature
              </Typography>
            </Box>
          </Card>
        </div>
        <div className="headerBlockContainer"
             style={{
               boxShadow: state.currentTab === 'sollmolsture' ? '0px 4px 10px #E4A367' : ''
             }}
             onClick={() => {
               setState({
                 ...state,
                 currentTab: 'sollmolsture',
               })
             }}
        >
          <Card className="headerBlock">
            <Box className="infoContainer">
              <img src={OilIcon}/>
            </Box>
            <Box className="infoContainer">
              <Typography className="titleText" style={{ marginBottom: 10 }}>
                Soll<br/>
                Molsture
              </Typography>
            </Box>
          </Card>
        </div>
        <div className="headerBlockContainer dotIcon" style={{ width: 'auto', padding: '0 37px' }}>
          <img src={DotIcon}/>
        </div>
      </div>
    </>
  );
};

export default ChartActions;
