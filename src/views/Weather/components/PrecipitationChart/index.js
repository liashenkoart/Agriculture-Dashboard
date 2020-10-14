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
  MarkSeries,
  Crosshair,
} from 'react-vis';
import CsvDownloader from 'react-csv-downloader';

import {
  monthNames,
  getHistoricalTemp,
  getForecastArr,
  getForecastTemp,
  getClim,
  getMinY,
  getMaxY,
  trimmData,
} from './helper';

import historical from '../../../../data/historical_tp';
import forecast from '../../../../data/forecast_tp';
import clim from '../../../../data/clim_tp';

import clsx from 'clsx';
import ChartSpecs from '../ChartSpecs';
import ChartViewer from '../ChartViewer';

const PrecipitationChart = ({ actionsState }) => {
  const initialState = {
    data: [],
    target: '',
  };

  const [points, setPoints] = useState(initialState);

  const handleSetPoints = function (v) {
    if (points.target === this.target) {
      setPoints((prevPoints) => ({
        ...prevPoints,
        data: [v],
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
    return `${new Date(d).getDate()} ${monthNames[new Date(d).getMonth()]}`;
  };

  const historicalTemp = useMemo(() => getHistoricalTemp(historical), [historical]);

  const forecastArr = useMemo(() => getForecastArr(forecast), [forecast]);
  const forecastTemp = useMemo(() => getForecastTemp(forecast, forecastArr), [forecast, forecastArr]);

  const { climLighten, climDarken } = useMemo(() => getClim(clim), [clim]);

  const minY = useMemo(() => getMinY(historicalTemp), [historicalTemp]);
  const maxY = useMemo(() => getMaxY(historicalTemp), [historicalTemp]);

  const useStyles = makeStyles((theme) => ({
    root: {
      boxShadow: theme.palette.effectStyles.backGlowCards.boxShadow,
      borderRadius: '20px',
    },
  }));

  const histCsvCols = Object.keys(historical).map((item) => {
    return {
      id: item,
      displayName: item,
    }
  });

  const histCsvData = historical.time.map((item, index) => {
    return {
      'time': item,
      'tp_sum': historical['tp_sum'][index],
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
      'tp_sum': forecastArr[index],
    };
  });

  const climCsvCols = Object.keys(clim).map((item) => {
    return {
      id: item,
      displayName: item,
    }
  });

  console.log(clim);

  const climArr = [].concat.apply([], Object.values(clim['tp_sum']));

  const climCsvData = clim.time.map((item, index) => {
    return {
      'time': item,
      'tp_sum': climArr[index],
    };
  });

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
                Precipitation [mm]
              </Typography>
              <FlexibleWidthXYPlot
                className="flexible-chart"
                height={500}
                xType="time"
                onMouseLeave={handleMouseLeave}
                yDomain={[minY, maxY]}
              >
                <VerticalGridLines/>
                <HorizontalGridLines/>
                <XAxis tickFormat={tickFormat}/>
                <YAxis className="y-axis"/>
                <AreaSeries
                  // data={climLighten}
                  data={!actionsState.isMonthly ? trimmData(climLighten) : climLighten}
                  color="#C0E1EB"
                />
                <AreaSeries
                  data={!actionsState.isMonthly ? trimmData(climDarken) : climDarken}
                  // data={climDarken}
                  color="#A0CBE0"
                />
                <LineSeries
                  color="#237CB5"
                  // data={historicalTemp}
                  data={!actionsState.isMonthly ? trimmData(historicalTemp) : historicalTemp}
                  curve="curveMonotoneX"
                  onSeriesMouseOver={handleMouseOver.bind({ target: 'historical' })}
                  onNearestX={handleSetPoints.bind({ target: 'historical' })}
                />
                <LineSeries
                  color="#237CB5"
                  // data={forecastTemp}
                  data={!actionsState.isMonthly ? trimmData(forecastTemp) : forecastTemp}
                  curve="curveMonotoneX"
                  strokeStyle="dashed"
                  onSeriesMouseOver={handleMouseOver.bind({ target: 'forecast' })}
                  onNearestX={handleSetPoints.bind({ target: 'forecast' })}
                />
                {
                  points.data.length ? (
                    <LineSeries
                      data={[{
                        x: points.data[0].x,
                        y: minY
                      }, {
                        x: points.data[0].x,
                        y: maxY
                      }]}
                      strokeStyle="dashed"
                      color="#707070"
                    />
                  ) : null
                }
                {
                  points.data.length ? (
                    <MarkSeries
                      data={points.data}
                      color="#446EA1"
                    />
                  ) : null
                }
                <Crosshair
                  values={points.data}
                  style={{ line: { display: 'none' } }}
                >
                  <ChartViewer
                    type="precipitation"
                    points={points}
                  />
                </Crosshair>
              </FlexibleWidthXYPlot>
            </div>
          </CardContent>
        </Card>
        <ChartSpecs type="precipitation" />
      </Box>
    </>
  );
};

export default PrecipitationChart;
