import React, { useCallback, useMemo, useState } from 'react';
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
} from 'react-vis';
import CsvDownloader from 'react-csv-downloader';

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
  const initialState = {
    min: [],
    max: [],
    target: '',
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

  const histCsvCols = Object.keys(historical).map((item) => {
    return {
      id: item,
      displayName: item,
    }
  });

  const histCsvData = historical.time.map((item, index) => {
    return {
      'time': item,
      't2m_min': historical['t2m_min'][index],
      't2m_max': historical['t2m_max'][index],
    };
  });

  const forcCsvCols = Object.keys(forecast).map((item) => {
    return {
      id: item,
      displayName: item,
    }
  });

  const forcCsvData = forecast.time.map((item, index) => {
    return {
      'time': item,
      't2m_min': forecastMinArr[index],
      't2m_max': forecastMaxArr[index],
    };
  });

  const climCsvCols = Object.keys(clim).map((item) => {
    return {
      id: item,
      displayName: item,
    }
  });

  const climMaxArr = [].concat.apply([], Object.values(clim['t2m_max']));
  const climMinArr = [].concat.apply([], Object.values(clim['t2m_min']));

  const climCsvData = clim.time.map((item, index) => {
    return {
      'time': item,
      't2m_min': climMinArr[index],
      't2m_max': climMaxArr[index],
    };
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
      <Box className="btns-container">
        <CsvDownloader filename="myfile" columns={histCsvCols} datas={histCsvData}>
          <button>Historical</button>
        </CsvDownloader>
        <CsvDownloader filename="myfile" columns={forcCsvCols} datas={forcCsvData}>
          <button>Forecast</button>
        </CsvDownloader>
        <CsvDownloader filename="myfile" columns={climCsvCols} datas={climCsvData}>
          <button>Climate</button>
        </CsvDownloader>
      </Box>
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
                onMouseLeave={handleMouseLeave}
                yDomain={[minY, maxY]}
                xType="time"
              >
                <VerticalGridLines/>
                <HorizontalGridLines/>
                <AreaSeries
                  data={!actionsState.isMonthly ? trimmData(climMaxLighten) : climMaxLighten}
                  color="#FFC1C3"
                />
                <AreaSeries
                  data={!actionsState.isMonthly ? trimmData(climMaxDarken) : climMaxDarken}
                  color="#FF8D91"
                />
                <AreaSeries
                  data={!actionsState.isMonthly ? trimmData(climMinLighten) : climMinLighten}
                  color="#D9ECFF"
                />
                <AreaSeries
                  data={!actionsState.isMonthly ? trimmData(climMinDarken) : climMinDarken}
                  color="#B0D2F6"
                />
                <LineSeries
                  color="#446EA1"
                  data={!actionsState.isMonthly ? trimmData(historicalMinTemp) : historicalMinTemp}
                  curve="curveMonotoneX"
                  onSeriesMouseOver={handleMouseOver.bind({ target: 'historical' })}
                  onNearestX={handleSetPoints.bind({ type: 'min', target: 'historical' })}
                />
                <LineSeries
                  color="#FF3D3D"
                  data={!actionsState.isMonthly ? trimmData(historicalMaxTemp) : historicalMaxTemp}
                  curve="curveMonotoneX"
                  onSeriesMouseOver={handleMouseOver.bind({ target: 'historical' })}
                  onNearestX={handleSetPoints.bind({ type: 'max', target: 'historical' })}
                />
                <LineSeries
                  color="#446EA1"
                  data={!actionsState.isMonthly ? trimmData(forecastMinTemp) : forecastMinTemp}
                  curve="curveMonotoneX"
                  strokeStyle="dashed"
                  onSeriesMouseOver={handleMouseOver.bind({ target: 'forecast' })}
                  onNearestX={handleSetPoints.bind({ type: 'min', target: 'forecast' })}
                />
                <LineSeries
                  color="#FF3D3D"
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
                      color="#446EA1"
                    />
                  ) : null
                }
                {
                  points.max.length ? (
                    <MarkSeries
                      data={points.max}
                      color="#FF152F"
                    />
                  ) : null
                }
                <Crosshair
                  values={points.min}
                  style={{ line: { display: 'none' } }}
                >
                  <ChartViewer points={points}/>
                </Crosshair>
                <XAxis tickFormat={tickFormat}/>
                <YAxis className="y-axis"/>
              </FlexibleWidthXYPlot>
            </div>
          </CardContent>
        </Card>
        <ChartSpecs type="temp" />
      </Box>
    </>
  );
};

export default TempChart;
