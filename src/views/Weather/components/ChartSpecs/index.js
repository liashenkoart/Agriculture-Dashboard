import React from 'react';
import { Card, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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
    marginTop: 20,
  },
  headerBlockContainer: {
    margin: '0 auto 25px auto',
  },
  headerBlock: {
    boxShadow: '0px 4px 10px rgba(56, 78, 99, 0.2)',
    border: 0,
    borderRadius: 20,
    padding: '14px 33px',
  },
  titleText: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    marginBottom: 14,
  },
  temperatureText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    marginLeft: 8,
  },
  infoContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 14,
  },
}));

const ChartSpecs = ({ type }) => {
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
