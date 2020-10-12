import React, { useCallback, useMemo, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
  AreaSeries,
} from 'react-vis';

import {
  monthNames,
  getHistoricalTemp,
  getForecastArr,
  getForecastTemp,
  getClim,
} from './helper';

import historical from '../../../../data/historical_tp';
import forecast from '../../../../data/forecast_tp';
import clim from '../../../../data/clim_tp';

import clsx from 'clsx';
import ChartHeader from '../ChartHeader';

const PrecipitationChart = () => {
  const tickFormat = (d) => {
    return `${new Date(d).getDate()} ${monthNames[new Date(d).getMonth()]}`;
  };

  const historicalTemp = useMemo(() => getHistoricalTemp(historical), [historical]);

  const forecastArr = useMemo(() => getForecastArr(forecast), [forecast]);
  const forecastTemp = useMemo(() => getForecastTemp(forecast, forecastArr), [forecast, forecastArr]);

  const { climLighten, climDarken } = useMemo(() => getClim(clim), [clim]);

  const useStyles = makeStyles((theme) => ({
    root: {
      boxShadow: theme.palette.effectStyles.backGlowCards.boxShadow,
      borderRadius: '20px',
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Box className="chart-grid">
        <Card className={clsx(classes.root)}>
          <CardContent>
            <div className="chart-block">
              <Typography className="y-label">
                Tempereture in °F
              </Typography>
              <FlexibleWidthXYPlot
                className="flexible-chart"
                height={500}
                xType="time"
              >
                <VerticalGridLines/>
                <HorizontalGridLines/>
                <XAxis tickFormat={tickFormat}/>
                <YAxis className="y-axis"/>
                <AreaSeries
                  data={climLighten}
                  color="#C0E1EB"
                />
                <AreaSeries
                  data={climDarken}
                  color="#A0CBE0"
                />
                <LineSeries
                  color="#237CB5"
                  data={historicalTemp}
                  curve="curveMonotoneX"
                />
                <LineSeries
                  color="#237CB5"
                  data={forecastTemp}
                  curve="curveMonotoneX"
                  strokeStyle="dashed"
                />
              </FlexibleWidthXYPlot>
            </div>
          </CardContent>
        </Card>
        <ChartHeader/>
      </Box>
    </>
  );
};

export default PrecipitationChart;
