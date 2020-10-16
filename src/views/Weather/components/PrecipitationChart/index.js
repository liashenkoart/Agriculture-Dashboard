import React, { useCallback, useMemo, useRef, useState } from 'react';
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
  ChartLabel
} from 'react-vis';

import {
  monthNames,
  getHistoricalTemp,
  getExtraHistoricalTemp,
  getForecastArr,
  getForecastTemp,
  getExtraForecastTemp,
  getClim,
  getExtraClim,
  getMinY,
  getMaxY,
  trimmData,
} from './helper';

import historical from '../../../../data/historical_tp';
import forecast from '../../../../data/forecast_tp';
import clim from '../../../../data/clim_tp';

import extraHistorical from '../../../../data/historical_tp-e';
import extraForecast from '../../../../data/forecast_tp-e';
import extraClim from '../../../../data/clim_tp-e';

import clsx from 'clsx';
import ChartSpecs from '../ChartSpecs';
import ChartViewer from '../ChartViewer';
import Dropdown from '../Dropdown';

const PrecipitationChart = ({ actionsState }) => {
  const chartRef = useRef(null);
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

  const extraHistoricalTemp = useMemo(() => getExtraHistoricalTemp(extraHistorical), [extraHistorical]);

  const extraForecastTemp = useMemo(() => getExtraForecastTemp(extraForecast, forecastArr), [extraForecast, forecastArr]);

  const { extraClimLighten, extraClimDarken } = useMemo(() => getExtraClim(extraClim), [extraClim]);

  const minY = useMemo(() => getMinY(historicalTemp), [historicalTemp]);
  const maxY = useMemo(() => getMaxY(historicalTemp), [historicalTemp]);

  const extraMinY = useMemo(() => getMinY(extraHistoricalTemp), [extraHistoricalTemp]);
  const extraMaxY = useMemo(() => getMaxY(extraHistoricalTemp), [extraHistoricalTemp]);

  const histCsvData = historical.time.map((item, index) => {
    return [
      item,
      historical['tp_sum'][index],
    ];
  });

  const forcCsvData = forecast.time.map((item, index) => {
    return [
      item,
      forecastArr[index],
    ];
  });

  const climArr = [].concat.apply([], Object.values(clim['tp_sum']));

  const climCsvData = clim.time.map((item, index) => {
    return [
      item,
      climArr[index],
    ];
  });

  const combinedCsvData = (clim, forecast, historical) => clim.map((item, index) => {
    if (historical[index] && !forecast[index]) {
      return [
        ...item,
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
      <Box className="btns-container">
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
          data={combinedCsvData(climCsvData, forcCsvData, histCsvData)}
        />
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
                ref={chartRef}
                yDomain={!actionsState.extraPrecipitationChart ? [minY, maxY] : [extraMinY, extraMaxY]}
                style={{ backgroundColor: '#fff' }}
              >
                <VerticalGridLines/>
                <HorizontalGridLines/>
                <XAxis tickFormat={tickFormat}/>
                <YAxis className="y-axis"/>
                {
                  !actionsState.extraPrecipitationChart ? (
                    [
                      <AreaSeries
                        data={!actionsState.isMonthly ? trimmData(climLighten) : climLighten}
                        color="#C0E1EB"
                      />,
                      <AreaSeries
                        data={!actionsState.isMonthly ? trimmData(climDarken) : climDarken}
                        color="#A0CBE0"
                      />,
                      <LineSeries
                        color="#237CB5"
                        data={!actionsState.isMonthly ? trimmData(historicalTemp) : historicalTemp}
                        curve="curveMonotoneX"
                        onSeriesMouseOver={handleMouseOver.bind({ target: 'historical' })}
                        onNearestX={handleSetPoints.bind({ target: 'historical' })}
                      />,
                      <LineSeries
                        color="#237CB5"
                        data={!actionsState.isMonthly ? trimmData(forecastTemp) : forecastTemp}
                        curve="curveMonotoneX"
                        strokeStyle="dashed"
                        onSeriesMouseOver={handleMouseOver.bind({ target: 'forecast' })}
                        onNearestX={handleSetPoints.bind({ target: 'forecast' })}
                      />
                    ]
                  ) : (
                    [
                      <AreaSeries
                        data={!actionsState.isMonthly ? trimmData(extraClimLighten) : extraClimLighten}
                        color="#C0E1EB"
                      />,
                      <AreaSeries
                        data={!actionsState.isMonthly ? trimmData(extraClimDarken) : extraClimDarken}
                        color="#A0CBE0"
                      />,
                      <LineSeries
                        color="#237CB5"
                        data={!actionsState.isMonthly ? trimmData(extraHistoricalTemp) : extraHistoricalTemp}
                        curve="curveMonotoneX"
                        onSeriesMouseOver={handleMouseOver.bind({ target: 'historical' })}
                        onNearestX={handleSetPoints.bind({ target: 'historical' })}
                      />,
                      <LineSeries
                        color="#237CB5"
                        data={!actionsState.isMonthly ? trimmData(extraForecastTemp) : extraForecastTemp}
                        curve="curveMonotoneX"
                        strokeStyle="dashed"
                        onSeriesMouseOver={handleMouseOver.bind({ target: 'forecast' })}
                        onNearestX={handleSetPoints.bind({ target: 'forecast' })}
                      />
                    ]
                  )
                }
                {
                  points.data.length ? (
                    [
                      <LineSeries
                        data={[{
                          x: points.data[0].x,
                          y: !actionsState.extraPrecipitationChart ? minY : extraMinY,
                        }, {
                          x: points.data[0].x,
                          y: !actionsState.extraPrecipitationChart ? maxY : extraMaxY,
                        }]}
                        strokeStyle="dashed"
                        color="#707070"
                      />,
                      <MarkSeries
                        data={points.data}
                        color="#446EA1"
                      />
                    ]
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
                <ChartLabel
                  text={!actionsState.extraPrecipitationChart ? 'Precipitation' : 'Precipitation-evaporation'}
                  className="main-titles"
                  includeMargin={false}
                  xPercent={0.035}
                  yPercent={0.1}
                />
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
