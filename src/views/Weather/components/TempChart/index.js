import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react';
import { Box, Card, CardContent, Typography } from '@material-ui/core';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
  AreaSeries,
  MarkSeries,
  Crosshair,
  ChartLabel,
} from 'react-vis';
import Dropdown from '../Dropdown';

import {
  monthNames,
  getHistoricalMinTemp,
  getHistoricalMaxTemp,
  getMinY,
  getMaxY,
  getForecastMinTemp,
  getForecastMaxTemp,
  getClimMin,
  getClimMax,
  getForecastMinArr,
  getForecastMaxArr,
  trimmData,
} from './helper';

import historical from '../../../../data/historical';
import forecast from '../../../../data/forecast';
import clim from '../../../../data/clim';

import ChartViewer from '../ChartViewer';
import clsx from 'clsx';
import ChartSpecs from '../ChartSpecs';
import { makeStyles } from '@material-ui/styles';

const TempChart = ({ actionsState }) => {
  const chartRef = useRef(null);

  const initialState = {
    min: [],
    max: [],
    target: '',
    chartWidth: 0,
  };

  const [points, setPoints] = useState(initialState);

  const handleSetPoints = function (v) {
    if (this.type === 'min' && points.target === this.target) {
      setPoints((prevPoints) => ({
        ...prevPoints,
        min: [v],
      }));
    } else if (this.type === 'max' && points.target === this.target) {
      setPoints((prevPoints) => ({
        ...prevPoints,
        max: [v],
      }));
    }
  };

  useEffect(() => {
    setPoints((prevState) => ({
      ...prevState,
      chartWidth: chartRef.current.offsetWidth,
    }));
  }, [chartRef.current]);

  const handleMouseLeave = useCallback(() => {
    setPoints(initialState);
  }, []);

  const handleMouseOver = useCallback(function () {
    setPoints((prevPoints) => ({
      ...prevPoints,
      target: this.target,
    }));
  }, []);

  const tickFormat = (d) => {
    if (actionsState.isMonthly) {
      return monthNames[new Date(d).getMonth()];
    } else {
      console.log(new Date(d).getDate());
      return `${new Date(d).getDate()} ${monthNames[new Date(d).getMonth()]}`;
    }
  };

  const historicalMinTemp = useMemo(() => getHistoricalMinTemp(historical), [historical]);
  const historicalMaxTemp = useMemo(() => getHistoricalMaxTemp(historical), [historical]);

  const minY = useMemo(() => getMinY(historicalMinTemp), [historicalMinTemp]);
  const maxY = useMemo(() => getMaxY(historicalMaxTemp), [historicalMaxTemp]);

  const forecastMinArr = useMemo(() => getForecastMinArr(forecast), [forecast]);
  const forecastMaxArr = useMemo(() => getForecastMaxArr(forecast), [forecast]);

  const forecastMinTemp = useMemo(() => getForecastMinTemp(forecast, forecastMinArr), [forecast, forecastMinArr]);
  const forecastMaxTemp = useMemo(() => getForecastMaxTemp(forecast, forecastMaxArr), [forecast, forecastMaxArr]);

  const { climMinLighten, climMinDarken } = useMemo(() => getClimMin(clim), [clim]);
  const { climMaxLighten, climMaxDarken } = useMemo(() => getClimMax(clim), [clim]);

  const histCsvData = historical.time.map((item, index) => {
    return [
      item,
      historical['t2m_min'][index],
      historical['t2m_max'][index],
    ];
  });

  const forcCsvData = forecast.time.map((item, index) => {
    return [
      item,
      forecastMinArr[index],
      forecastMaxArr[index],
    ];
  });

  const climMaxArr = [].concat.apply([], Object.values(clim['t2m_max']));
  const climMinArr = [].concat.apply([], Object.values(clim['t2m_min']));

  const climCsvData = clim.time.map((item, index) => {
    return [
      item,
      climMinArr[index],
      climMaxArr[index],
    ];
  });

  const combinedCsvData = (clim, forecast, historical) => clim.map((item, index) => {
    if (historical[index] && !forecast[index]) {
      return [
        ...item,
        [''],
        [''],
        [''],
        ...historical[index],
      ];
    } else if (forecast[index]) {
      return [
        ...item,
        ...forecast[index],
        [''],
        [''],
        [''],
      ]
    } else {
      return [
        ...item,
      ];
    }
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      boxShadow: theme.palette.effectStyles.backGlowCards.boxShadow,
      borderRadius: '20px',
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Box className="">
        <Card className={clsx(classes.root)}>
          <CardContent className="chart-grid">
            <FlexibleWidthXYPlot
              className="flexible-chart"
              height={500}
              onMouseLeave={handleMouseLeave}
              yDomain={[minY, maxY]}
              xType="time"
              ref={chartRef}
              style={{ backgroundColor: '#fff' }}
            >
              <VerticalGridLines/>
              <HorizontalGridLines/>
              <AreaSeries
                data={!actionsState.isMonthly ? trimmData(climMaxLighten) : climMaxLighten}
                color="#F8D6C5"
              />
              <AreaSeries
                data={!actionsState.isMonthly ? trimmData(climMaxDarken) : climMaxDarken}
                color="#FDBE9D"
              />
              <AreaSeries
                data={!actionsState.isMonthly ? trimmData(climMinLighten) : climMinLighten}
                color="#DBEBF5"
              />
              <AreaSeries
                data={!actionsState.isMonthly ? trimmData(climMinDarken) : climMinDarken}
                color="#C6E2F1"
              />
              <LineSeries
                color="#0089C6"
                data={!actionsState.isMonthly ? trimmData(historicalMinTemp) : historicalMinTemp}
                curve="curveMonotoneX"
                onSeriesMouseOver={handleMouseOver.bind({ target: 'historical' })}
                onNearestX={handleSetPoints.bind({ type: 'min', target: 'historical' })}
              />
              <LineSeries
                color="#FF7100"
                data={!actionsState.isMonthly ? trimmData(historicalMaxTemp) : historicalMaxTemp}
                curve="curveMonotoneX"
                onSeriesMouseOver={handleMouseOver.bind({ target: 'historical' })}
                onNearestX={handleSetPoints.bind({ type: 'max', target: 'historical' })}
              />
              <LineSeries
                color="#0089C6"
                data={!actionsState.isMonthly ? trimmData(forecastMinTemp) : forecastMinTemp}
                curve="curveMonotoneX"
                strokeStyle="dashed"
                onSeriesMouseOver={handleMouseOver.bind({ target: 'forecast' })}
                onNearestX={handleSetPoints.bind({ type: 'min', target: 'forecast' })}
              />
              <LineSeries
                color="#FF7100"
                data={!actionsState.isMonthly ? trimmData(forecastMaxTemp) : forecastMaxTemp}
                curve="curveMonotoneX"
                strokeStyle="dashed"
                onSeriesMouseOver={handleMouseOver.bind({ target: 'forecast' })}
                onNearestX={handleSetPoints.bind({ type: 'max', target: 'forecast' })}
              />
              {
                points.min.length || points.max.length ? (
                  <LineSeries
                    data={[{
                      x: points.min.length ? points.min[0].x : points.max[0].x,
                      y: minY
                    }, {
                      x: points.min.length ? points.min[0].x : points.max[0].x,
                      y: maxY
                    }]}
                    strokeStyle="dashed"
                    color="#707070"
                  />
                ) : null
              }
              {
                points.min.length ? (
                  <MarkSeries
                    data={points.min}
                    color="#0089C6"
                  />
                ) : null
              }
              {
                points.max.length ? (
                  <MarkSeries
                    data={points.max}
                    color="#FF7100"
                  />
                ) : null
              }
              <Crosshair
                values={points.min}
                style={{ line: { display: 'none' } }}
              >
                <ChartViewer
                  type="temp"
                  points={points}
                />
              </Crosshair>
              <ChartLabel
                text="Minimum and Maximum Temperature"
                className="main-titles"
                includeMargin={false}
                xPercent={0.035}
                yPercent={0.1}
              />
              <XAxis
                tickFormat={tickFormat}
                tickTotal={points.chartWidth ? points.chartWidth / 45 : null}
              />
              <YAxis />
            </FlexibleWidthXYPlot>
            <ChartSpecs
              type="temp"
              chartRef={chartRef}
              data={combinedCsvData(climCsvData, forcCsvData, histCsvData)}
            />
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default TempChart;
