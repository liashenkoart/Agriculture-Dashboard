import React from 'react';
import { Card, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import RedDotsIcon from '../../../../assets/Chart/red-dots.svg';
import BlueDotsIcon from '../../../../assets/Chart/blue-dots.svg';
import RedObserved from '../../../../assets/Chart/red-observed.svg';
import BlueObserved from '../../../../assets/Chart/blue-observed.svg';

const useStyles = makeStyles(() => ({
  chartViewer: {
    boxShadow: '0px 4px 10px rgba(56, 78, 99, 0.2)',
    border: 0,
    borderRadius: 20,
    padding: '14px 33px',
    margin: 20,
  },
  titleText: {
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
                {Math.floor(points.data[0].y)}℃
              </Typography>
            </Box>
          </Card>
        );
      case 'temp':
        return (
          <>
            {
              points.min.length && points.max.length ? (
                <Card className={chartViewer}>
                  <Typography className={titleText}>
                    {new Date(points.min[0].x).getDate()}<sup>th</sup> {monthNames[new Date(points.min[0].x).getMonth()]}
                  </Typography>
                  <Box className={infoContainer}>
                    {
                      points.target === 'forecast' ? <img src={RedDotsIcon}/> : <img src={RedObserved}/>
                    }
                    <Typography className={temperatureText}>
                      {Math.floor(points.max[0].y)}℃
                    </Typography>
                  </Box>
                  <Box className={infoContainer} style={{ marginBottom: 0 }}>
                    {
                      points.target === 'forecast' ? <img src={BlueDotsIcon}/> : <img src={BlueObserved}/>
                    }
                    <Typography className={temperatureText}>
                      {Math.floor(points.min[0].y)}℃
                    </Typography>
                  </Box>
                </Card>
              ) : null
            }
          </>
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
