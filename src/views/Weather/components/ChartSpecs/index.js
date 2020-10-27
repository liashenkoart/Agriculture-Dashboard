import React from 'react';
import { Card, Typography, Box, Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import Dropdown from '../Dropdown';

import RedDotsIcon from '../../../../assets/Chart/red-dots.svg';
import BlueDotsIcon from '../../../../assets/Chart/blue-dots.svg';
import RedObservedIcon from '../../../../assets/Chart/red-observed.svg';
import BlueObservedIcon from '../../../../assets/Chart/blue-observed.svg';
import RedLightenHistoricalIcon from '../../../../assets/Chart/red-lighten-historical.svg';
import RedDarkenHistoricalIcon from '../../../../assets/Chart/red-darken-historical.svg';
import BlueLightenHistoricalIcon from '../../../../assets/Chart/blue-lighten-historical.svg';
import BlueDarkenHistoricalIcon from '../../../../assets/Chart/blue-darken-historical.svg';
import GreenLightenHistoricalIcon from '../../../../assets/Chart/green-lighten-historical.svg';
import GreenDarkenHistoricalIcon from '../../../../assets/Chart/green-darken-historical.svg';

const useStyles = makeStyles(() => ({
  headerBlocksContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  headerBlockContainer: {
    marginBottom: 18,
    borderBottom: '0.5px solid #A3B1BD',
    '&:last-child': {
      borderBottom: '0 !important',
    }
  },
  headerBlock: {
    border: 0,
    paddingBottom: 16,
    borderRadius: 0,
    boxShadow: 'none',
  },
  titleText: {
    fontFamily: 'Montserrat',
    fontWeight: 600,
    fontSize: 12,
    marginBottom: 9,
  },
  temperatureText: {
    fontFamily: 'Roboto',
    fontSize: 12,
    marginLeft: 12,
  },
  infoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const ChartSpecs = ({ type, chartRef, data, onSliderChange, actionsState }) => {
  const {
    headerBlocksContainer,
    headerBlockContainer,
    headerBlock,
    titleText,
    temperatureText,
    infoContainer
  } = useStyles();

  let colsArr = [
    'Timeline',
    'History_min',
    'History_max',
    'Forecast_min',
    'Forecast_max',
    'Observed_min',
    'Observed_max',
  ];

  if (actionsState.currentTab === 'precipitation') {
    colsArr = [
      'Timeline',
      'History',
      'Forecast',
      'Observed',
    ];
  } else if (actionsState.extraHumidityChart) {
    colsArr = [
      'Timeline',
      'History',
      'Forecast',
      'Observed',
    ];
  } else if (actionsState.extraEvapotranspirationChart) {
    colsArr = [
      'Timeline',
      'History',
      'Forecast',
      'Observed',
    ];
  }

  return (
    <div className={headerBlocksContainer}>
      {
        actionsState.extraPrecipitationChart ? (
          <div className="slider-container">
            <Typography className={titleText}>
              Evaporation Rate
            </Typography>
            <Slider
              defaultValue={0.3}
              aria-labelledby="discrete-slider-small-steps"
              step={0.1}
              marks
              min={0.3}
              max={2}
              valueLabelDisplay="auto"
              onChange={onSliderChange}
            />
          </div>
        ) : null
      }
      <div className="btns-container">
        <Dropdown
          chartRef={chartRef}
          cols={colsArr}
          data={data}
          actionsState={actionsState}
        />
      </div>
      <div className={headerBlockContainer}>
        <Typography className={titleText}>
          Observed
        </Typography>
        <Card className={headerBlock}>
          {
            type === 'temp' ? (
              <>
                <Box className={infoContainer}>
                  <img src={RedObservedIcon}/>
                  <Typography className={temperatureText}>
                    Tmax
                  </Typography>
                </Box>
                <Box className={infoContainer} style={{ marginBottom: 0 }}>
                  <img src={BlueObservedIcon}/>
                  <Typography className={temperatureText}>
                    Tmin
                  </Typography>
                </Box>
              </>
            ) : null
          }
          {
            type === 'precipitation' ? (
              <Box className={infoContainer} style={{ marginBottom: 0 }}>
                <img src={BlueObservedIcon}/>
                <Typography className={temperatureText}>
                  T
                </Typography>
              </Box>
            ) : null
          }
          {
            type === 'evapotranspiration' ? (
              <Box className={infoContainer} style={{ marginBottom: 0 }}>
                <img src={RedObservedIcon}/>
                <Typography className={temperatureText}>
                  T
                </Typography>
              </Box>
            ) : null
          }
        </Card>
      </div>
      <div className={headerBlockContainer}>
        <Typography className={titleText}>
          Forecast
        </Typography>
        <Card className={headerBlock}>
          {
            type === 'temp' ? (
              <>
                <Box className={infoContainer}>
                  <img src={RedDotsIcon}/>
                  <Typography className={temperatureText}>
                    Tmax
                  </Typography>
                </Box>
                <Box className={infoContainer} style={{ marginBottom: 0 }}>
                  <img src={BlueDotsIcon}/>
                  <Typography className={temperatureText}>
                    Tmin
                  </Typography>
                </Box>
              </>
            ) : null
          }
          {
            type === 'precipitation' ? (
              <Box className={infoContainer} style={{ marginBottom: 0 }}>
                <img src={BlueDotsIcon}/>
                <Typography className={temperatureText}>
                  T
                </Typography>
              </Box>
            ) : null
          }
          {
            type === 'evapotranspiration' ? (
              <Box className={infoContainer} style={{ marginBottom: 0 }}>
                <img src={RedDotsIcon}/>
                <Typography className={temperatureText}>
                  T
                </Typography>
              </Box>
            ) : null
          }
        </Card>
      </div>
      <div className={headerBlockContainer}>
        <Typography className={titleText}>
          Historical
        </Typography>
        <Card className={headerBlock}>
          {
            type === 'temp' ? (
              <>
                <Box className={infoContainer}>
                  <img src={RedLightenHistoricalIcon}/>
                  <Typography className={temperatureText}>
                    90%
                  </Typography>
                </Box>
                <Box className={infoContainer} style={{ marginBottom: 0 }}>
                  <img src={RedDarkenHistoricalIcon}/>
                  <Typography className={temperatureText}>
                    50%
                  </Typography>
                </Box>
                <Box className={infoContainer} style={{ marginTop: 14 }}>
                  <img src={BlueLightenHistoricalIcon}/>
                  <Typography className={temperatureText}>
                    90%
                  </Typography>
                </Box>
                <Box className={infoContainer} style={{ marginBottom: 0 }}>
                  <img src={BlueDarkenHistoricalIcon}/>
                  <Typography className={temperatureText}>
                    50%
                  </Typography>
                </Box>
              </>
            ) : null
          }
          {
            type === 'precipitation' ? (
              <>
                <Box className={infoContainer}>
                  <img src={BlueLightenHistoricalIcon}/>
                  <Typography className={temperatureText}>
                    90%
                  </Typography>
                </Box>
                <Box className={infoContainer} style={{ marginBottom: 0 }}>
                  <img src={BlueDarkenHistoricalIcon}/>
                  <Typography className={temperatureText}>
                    50%
                  </Typography>
                </Box>
              </>
            ) : null
          }
          {
            type === 'evapotranspiration' ? (
              <>
                <Box className={infoContainer}>
                  <img src={GreenLightenHistoricalIcon}/>
                  <Typography className={temperatureText}>
                    90%
                  </Typography>
                </Box>
                <Box className={infoContainer} style={{ marginBottom: 0 }}>
                  <img src={GreenDarkenHistoricalIcon}/>
                  <Typography className={temperatureText}>
                    50%
                  </Typography>
                </Box>
              </>
            ) : null
          }
        </Card>
      </div>
    </div>
  );
};

export default ChartSpecs;
