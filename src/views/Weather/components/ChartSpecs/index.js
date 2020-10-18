import React from 'react';
import { Card, Typography, Box } from '@material-ui/core';
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

const ChartSpecs = ({ type, chartRef, data }) => {
  const {
    headerBlocksContainer,
    headerBlockContainer,
    headerBlock,
    titleText,
    temperatureText,
    infoContainer
  } = useStyles();

  return (
    <div className={headerBlocksContainer}>
      <div className="btns-container">
        <Dropdown
          chartRef={chartRef}
          cols={[
            'clim_time',
            'clim_tp_sum',
            'forecast_time',
            'forecast_tp_sum',
            'observed_time',
            'observed_tp_sum',
          ]}
          data={data}
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
            ) : (
              <Box className={infoContainer} style={{ marginBottom: 0 }}>
                <img src={BlueObservedIcon}/>
                <Typography className={temperatureText}>
                  T
                </Typography>
              </Box>
            )
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
            ) : (
              <Box className={infoContainer} style={{ marginBottom: 0 }}>
                <img src={BlueDotsIcon}/>
                <Typography className={temperatureText}>
                  T
                </Typography>
              </Box>
            )
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
            ) : (
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
            )
          }
        </Card>
      </div>
    </div>
  );
};

export default ChartSpecs;
