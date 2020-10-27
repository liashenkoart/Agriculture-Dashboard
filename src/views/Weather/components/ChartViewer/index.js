import React from 'react';
import { Card, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import RedDotsIcon from '../../../../assets/Chart/red-dots.svg';
import BlueDotsIcon from '../../../../assets/Chart/blue-dots.svg';
import RedObserved from '../../../../assets/Chart/red-observed.svg';
import BlueObserved from '../../../../assets/Chart/blue-observed.svg';

const useStyles = makeStyles(() => ({
  chartViewer: {
    boxShadow: '0px 4px 10px #C0D2E4',
    border: 0,
    borderRadius: 10,
    padding: '10px 10px',
    // marginBottom: 12
  },
  titleText: {
    fontFamily: 'Roboto',
    fontSize: 12,
  },
  temperatureText: {
    fontFamily: 'Roboto',
    fontSize: 12,
    marginLeft: 12,
  },
  infoContainer: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 30,
  },
}));

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const ChartViewer = ({ type, points }) => {
  const { chartViewer, titleText, temperatureText, infoContainer } = useStyles();

  const rendererComponent = (type) => {
    switch (type) {
      case 'precipitation':
        return (
          <Card className={chartViewer}>
            <Typography className={titleText}>
              {new Date(points.data[0].x).getDate()}<sup>th</sup> {monthNames[new Date(points.data[0].x).getMonth()]}
            </Typography>
            <Box className={infoContainer}>
              {
                points.target === 'forecast' ? <img src={BlueDotsIcon}/> : <img src={BlueObserved}/>
              }
              <Typography className={temperatureText}>
                {+points.data[0].y.toFixed(1)}mm
              </Typography>
            </Box>
          </Card>
        );
      case 'temp':
        return (
          <Card className={chartViewer}>
            <Typography className={titleText}>
              {new Date(points.min[0].x).getDate()}<sup>th</sup> {monthNames[new Date(points.min[0].x).getMonth()]}
            </Typography>
            <Box className={infoContainer}>
              {
                points.target === 'forecast' ? <img src={RedDotsIcon}/> : <img src={RedObserved}/>
              }
              <Typography className={temperatureText}>
                {Math.floor(points.max[0].y)}°C
              </Typography>
            </Box>
            <Box className={infoContainer} style={{ marginBottom: 0 }}>
              {
                points.target === 'forecast' ? <img src={BlueDotsIcon}/> : <img src={BlueObserved}/>
              }
              <Typography className={temperatureText}>
                {Math.floor(points.min[0].y)}°C
              </Typography>
            </Box>
          </Card>
        );
      case 'relative-humidity':
        return (
          <Card className={chartViewer}>
            <Typography className={titleText}>
              {new Date(points.data[0].x).getDate()}<sup>th</sup> {monthNames[new Date(points.data[0].x).getMonth()]}
            </Typography>
            <Box className={infoContainer}>
              {
                points.target === 'forecast' ? <img src={BlueDotsIcon}/> : <img src={BlueObserved}/>
              }
              <Typography className={temperatureText}>
                {+points.data[0].y.toFixed(1)}%
              </Typography>
            </Box>
          </Card>
        );
      case 'evapotranspiration':
        return (
          <Card className={chartViewer}>
            <Typography className={titleText}>
              {new Date(points.data[0].x).getDate()}<sup>th</sup> {monthNames[new Date(points.data[0].x).getMonth()]}
            </Typography>
            <Box className={infoContainer}>
              {
                points.target === 'forecast' ? <img src={RedDotsIcon}/> : <img src={RedObserved}/>
              }
              <Typography className={temperatureText}>
                {+points.data[0].y.toFixed(1)}wmm
              </Typography>
            </Box>
          </Card>
        );
    }
  };

  return (
    <>
      {rendererComponent(type)}
    </>
  );
};

export default ChartViewer;
