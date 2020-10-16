import React, { useState, useEffect, useRef } from 'react';
import { Card, Typography, Box } from '@material-ui/core';

import minMaxIcon from '../../../../assets/Chart/min-max.svg';
import CloudIcon from '../../../../assets/Chart/cloud.svg';
import SunIcon from '../../../../assets/Chart/sun.svg';
import OilIcon from '../../../../assets/Chart/oil.svg';
import DotIcon from '../../../../assets/Chart/dots.svg';
import Profile from '../../../../assets/Chart/profile.svg';
import Dropdown from 'rc-dropdown/es';

const ChartActions = ({ initialState, onStateChange }) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    onStateChange(state);
  }, [state]);

  const minMaxTab = useRef(null);
  const precipitationTab = useRef(null);
  const sollTempTab = useRef(null);
  const sollMolsture = useRef(null);

  const tabsDisabled = state.extraPrecipitationChart || state.additional2 || state.additional3 || state.additional4;

  if (tabsDisabled) {
    minMaxTab.current.classList.remove('headerBlockContainer-hover');
    precipitationTab.current.classList.remove('headerBlockContainer-hover');
    sollTempTab.current.classList.remove('headerBlockContainer-hover');
    sollMolsture.current.classList.remove('headerBlockContainer-hover');
  }

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
        <div
          ref={minMaxTab}
          className="headerBlockContainer headerBlockContainer-hover"
          style={{
            boxShadow: state.currentTab === 'minmax' && !tabsDisabled ? '0px 4px 10px #E4A367' : ''
          }}
          onClick={() => {
            setState({
              ...state,
              currentTab: 'minmax',
              extraPrecipitationChart: false,
              additional2: false,
              additional3: false,
              additional4: false,
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
        <div
          ref={precipitationTab}
          className="headerBlockContainer headerBlockContainer-hover"
          style={{
            boxShadow: state.currentTab === 'precipitation' && !tabsDisabled ? '0px 4px 10px #E4A367' : ''
          }}
          onClick={() => {
            setState({
              ...state,
              currentTab: 'precipitation',
              extraPrecipitationChart: false,
              additional2: false,
              additional3: false,
              additional4: false,
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
        <div
          ref={sollTempTab}
          className="headerBlockContainer headerBlockContainer-hover"
          style={{
            boxShadow: state.currentTab === 'solltemp' && !tabsDisabled ? '0px 4px 10px #E4A367' : ''
          }}
          onClick={() => {
            setState({
              ...state,
              currentTab: 'solltemp',
              extraPrecipitationChart: false,
              additional2: false,
              additional3: false,
              additional4: false,
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
        <div
          ref={sollMolsture}
          className="headerBlockContainer headerBlockContainer-hover"
          style={{
            boxShadow: state.currentTab === 'sollmolsture' && !tabsDisabled ? '0px 4px 10px #E4A367' : ''
          }}
          onClick={() => {
            setState({
              ...state,
              currentTab: 'sollmolsture',
              extraPrecipitationChart: false,
              additional2: false,
              additional3: false,
              additional4: false,
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
        <Dropdown
          overlayClassName="more-dropdown-container"
          trigger="click"
          overlay={(
            <div className="more-content-dropdown">
              <div
                className="more-item-dropdown"
                onClick={() => {
                  setState({
                    ...state,
                    extraPrecipitationChart: !state.extraPrecipitationChart,
                  })
                }}
              >
                Precipitation-evaporation
              </div>
              <div
                className="more-item-dropdown"
                onClick={() => {
                  setState({
                    ...state,
                    additional2: !state.additional2,
                  })
                }}
              >
                Aditional Graph 2
              </div>
              <div
                className="more-item-dropdown"
                onClick={() => {
                  setState({
                    ...state,
                    additional3: !state.additional3,
                  })
                }}
              >
                Aditional Graph 3
              </div>
              <div
                className="more-item-dropdown"
                onClick={() => {
                  setState({
                    ...state,
                    additional4: !state.additional4,
                  })
                }}
              >
                Aditional Graph 4
              </div>
            </div>
          )}
          animation="slide-up"
        >
          <div
            className="headerBlockContainer headerBlockContainer-hover dotIcon"
            style={{ width: 'auto', padding: '0 37px' }}
          >
            <img src={DotIcon}/>
          </div>
        </Dropdown>
      </div>
    </>
  );
};

export default ChartActions;
