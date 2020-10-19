import React, { useState, useEffect, useRef } from 'react';
import Dropdown from 'rc-dropdown';
import { Card, Typography, Box } from '@material-ui/core';

import minMaxIconActive from '../../../../assets/Chart/min-max-active.svg';
import CloudIconActive from '../../../../assets/Chart/cloud-active.svg';
import SunIconActive from '../../../../assets/Chart/sun-active.svg';
import OilIconActive from '../../../../assets/Chart/oil-active.svg';
import minMaxIcon from '../../../../assets/Chart/min-max.svg';
import CloudIcon from '../../../../assets/Chart/cloud.svg';
import SunIcon from '../../../../assets/Chart/sun.svg';
import OilIcon from '../../../../assets/Chart/oil.svg';
import DotIcon from '../../../../assets/Chart/dots.svg';
import DotIconWhite from '../../../../assets/Chart/dots-white.svg';
import Logo from '../../../../assets/Chart/logo.svg';
import Profile from '../../../../assets/Chart/profile.svg';

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
      <div className="mainProfileBlockContainer">
        <div className="mainProfileBlock">
          <img src={Profile} alt=""/>
          <div className="mainProfileBlockText">
            <p className="mainProfileBlockTitle">John Doe</p>
            <p className="mainProfileBlockDesc">Settings</p>
          </div>
        </div>
      </div>
      <div className="headerBlocksContainer">
        <div className="blocks-container">
          <div className="textBlockContainer"
               style={{
                 marginBottom: 15,
                 boxShadow: !state.isMonthly && '0px 4px 10px #C0D2E4',
                 backgroundColor: !state.isMonthly ? '#00548D' : '',
               }}
               onClick={() => {
                 setState({
                   ...state,
                   isMonthly: false,
                 })
               }}
          >
            <Typography
              className="textBlock"
              style={{
                color: !state.isMonthly ? '#fff' : ''
              }}
            >
              Daily
            </Typography>
          </div>
          {
            state.currentTab !== 'solltemp' && state.currentTab !== 'sollmolsture' ? (
              <div className="textBlockContainer"
                   style={{
                     marginBottom: 22,
                     boxShadow: state.isMonthly && '0px 4px 10px #C0D2E4',
                     backgroundColor: state.isMonthly ? '#00548D' : '',
                   }}
                   onClick={() => {
                     setState({
                       ...state,
                       isMonthly: true,
                     })
                   }}
              >
                <Typography
                  className="textBlock"
                  style={{
                    color: state.isMonthly ? '#fff' : ''
                  }}
                >
                  Monthly
                </Typography>
              </div>
            ) : (
              <div className="textBlockContainer"
                   style={{
                     marginBottom: 22,
                     boxShadow: state.isMonthly && '0px 4px 10px #C0D2E4',
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
            boxShadow: state.currentTab === 'minmax' && !tabsDisabled ? '0px 4px 10px #00548D' : '',
            backgroundColor: state.currentTab === 'minmax' && !tabsDisabled ? '#00548D' : '',
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
              {
                state.currentTab === 'minmax' && !tabsDisabled ? (
                  <img src={minMaxIcon}/>
                ) : (
                  <img src={minMaxIconActive}/>
                )
              }
            </Box>
            <Box className="infoContainer">
              <Typography
                className="titleText"
                style={{
                  color: state.currentTab === 'minmax' && !tabsDisabled ? '#fff' : ''
                }}
              >
                Min & Max
                Temp
              </Typography>
            </Box>
          </Card>
        </div>
        <div
          ref={precipitationTab}
          className="headerBlockContainer headerBlockContainer-hover"
          style={{
            boxShadow: state.currentTab === 'precipitation' && !tabsDisabled ? '0px 4px 10px #00548D' : '',
            backgroundColor: state.currentTab === 'precipitation' && !tabsDisabled ? '#00548D' : '',
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
              {
                state.currentTab === 'precipitation' && !tabsDisabled ? (
                  <img src={CloudIcon}/>
                ) : (
                  <img src={CloudIconActive}/>
                )
              }
            </Box>
            <Box className="infoContainer">
              <Typography
                className="titleText"
                style={{
                  marginBottom: 30,
                  color: state.currentTab === 'precipitation' && !tabsDisabled ? '#fff' : ''
                }}
              >
                Precipitation
              </Typography>
            </Box>
          </Card>
        </div>
        <div
          ref={sollTempTab}
          className="headerBlockContainer headerBlockContainer-hover"
          style={{
            boxShadow: state.currentTab === 'solltemp' && !tabsDisabled ? '0px 4px 10px #00548D' : '',
            backgroundColor: state.currentTab === 'solltemp' && !tabsDisabled ? '#00548D' : '',
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
              {
                state.currentTab === 'solltemp' && !tabsDisabled ? (
                  <img src={SunIcon}/>
                ) : (
                  <img src={SunIconActive}/>
                )
              }
            </Box>
            <Box className="infoContainer">
              <Typography
                className="titleText"
                style={{
                  marginBottom: 10,
                  color: state.currentTab === 'solltemp' && !tabsDisabled ? '#fff' : '',
                }}
              >
                Soll Temperature
              </Typography>
            </Box>
          </Card>
        </div>
        <div
          ref={sollMolsture}
          className="headerBlockContainer headerBlockContainer-hover"
          style={{
            boxShadow: state.currentTab === 'sollmolsture' && !tabsDisabled ? '0px 4px 10px #00548D' : '',
            backgroundColor: state.currentTab === 'sollmolsture' && !tabsDisabled ? '#00548D' : '',
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
              {
                state.currentTab === 'sollmolsture' && !tabsDisabled ? (
                  <img src={OilIcon}/>
                ) : (
                  <img src={OilIconActive}/>
                )
              }
            </Box>
            <Box className="infoContainer">
              <Typography
                className="titleText"
                style={{
                  marginBottom: 10,
                  color: state.currentTab === 'sollmolsture' && !tabsDisabled ? '#fff' : ''
                }}
              >
                Soll
                Molsture
              </Typography>
            </Box>
          </Card>
        </div>
        <Dropdown
          overlayClassName="more-dropdown-container"
          trigger="click"
          visible={state.extraDropdown}
          onVisibleChange={() => {
            setState({
              ...state,
              extraDropdown: !state.extraDropdown,
            })
          }}
          overlay={(
            <div className="more-content-dropdown">
              <div
                className="more-item-dropdown"
                onClick={() => {
                  setState({
                    ...state,
                    currentTab: 'precipitation',
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
            style={{
              backgroundColor: state.extraDropdown ? '#01548D' : ''
            }}
          >
            {
              !state.extraDropdown ? (
                <img src={DotIcon} />
              ) : (
                <img src={DotIconWhite} />
              )
            }
          </div>
        </Dropdown>
        <div className="headerBlockContainer profileBlock">
          <div className="profileTextContainer">
            <p className="profileTextBold">Variety: <span className="profileText">Yukon Gold</span></p>
            <p className="profileTextBold">Variety: <span className="profileText">Yukon Gold</span></p>
            <p className="profileTextBold">Variety: <span className="profileText">Yukon Gold</span></p>
            <p className="profileTextBold">Variety: <span className="profileText">Yukon Gold</span></p>
          </div>
          <img src={Logo} alt=""/>
        </div>
      </div>
    </>
  );
};

export default ChartActions;
