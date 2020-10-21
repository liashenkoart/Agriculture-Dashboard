import React, { useCallback, useMemo, useState, useRef, useEffect, useContext } from 'react';
import { Box, Card, CardContent, CircularProgress } from '@material-ui/core';
import { useParams } from 'react-router-dom';
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

import { AuthContext } from '../../../../Auth/Auth';
import networking from '../../../../Util/Networking';

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

import ChartViewer from '../ChartViewer';
import clsx from 'clsx';
import ChartSpecs from '../ChartSpecs';
import { makeStyles } from '@material-ui/styles';

const SollTempChart = ({ actionsState }) => {
  const chartRef = useRef(null);
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();

  const initialState = {
    min: [],
    max: [],
    target: '',
    chartWidth: 0,
  };

  const [points, setPoints] = useState(initialState);

  const [data, setData] = useState({
    'ds_hist': {
      time: [],
      'stl1_min': [],
      'stl1_max': [],
    },
    'ds_fc': {
      time: [],
      'stl1_min': [],
      'stl1_max': [],
    },
    'ds_clim': {
      time: [],
      'stl1_min': [],
      'stl1_max': [],
    },
    pending: true,
  });

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
    currentUser
      .getIdToken()
      .then((userToken) => {
        networking.get(`/api/v1/weather/soil_temperature/daily/${id}`, {
          extraHeaders: { 'User-Token': userToken },
        })
          .then((res) => {
            setData({
              ...res.data,
              pending: false,
            });
          })
          .catch((e) => {
            console.log(e);
            setData((prevData) => ({
              ...prevData,
              pending: false,
            }));
          });
      });
  }, [actionsState.isMonthly, actionsState.currentTab]);

  useEffect(() => {
    setPoints((prevState) => ({
      ...prevState,
      chartWidth: data.pending ? 0 : chartRef.current.offsetWidth,
    }));
  }, [chartRef.current, data.pending]);

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
      return `${new Date(d).getDate()} ${monthNames[new Date(d).getMonth()]}`;
    }
  };

  const historicalMinTemp = useMemo(() => getHistoricalMinTemp(data['ds_hist']), [data]);
  const historicalMaxTemp = useMemo(() => getHistoricalMaxTemp(data['ds_hist']), [data]);

  const minYHistorical = useMemo(() => getMinY(historicalMinTemp), [historicalMinTemp]);
  const maxYHistorical = useMemo(() => getMaxY(historicalMaxTemp), [historicalMaxTemp]);

  const forecastMinArr = useMemo(() => getForecastMinArr(data['ds_fc']), [data]);
  const forecastMaxArr = useMemo(() => getForecastMaxArr(data['ds_fc']), [data]);

  const forecastMinTemp = useMemo(() => getForecastMinTemp(data['ds_fc'], forecastMinArr), [data, forecastMinArr]);
  const forecastMaxTemp = useMemo(() => getForecastMaxTemp(data['ds_fc'], forecastMaxArr), [data, forecastMaxArr]);

  const minYForecast = useMemo(() => getMinY(forecastMinTemp), [forecastMinTemp]);
  const maxYForecast = useMemo(() => getMaxY(forecastMaxTemp), [forecastMaxTemp]);

  const { climMinLighten, climMinDarken } = useMemo(() => getClimMin(data['ds_clim']), [data]);
  const { climMaxLighten, climMaxDarken } = useMemo(() => getClimMax(data['ds_clim']), [data]);

  const histCsvData = data['ds_hist'].time.map((item, index) => {
    return [
      item,
      data['ds_hist']['stl1_min'][index],
      data['ds_hist']['stl1_max'][index],
    ];
  });

  const forcCsvData = data['ds_fc'].time.map((item, index) => {
    return [
      item,
      forecastMinArr[index],
      forecastMaxArr[index],
    ];
  });

  const climMaxArr = [].concat.apply([], Object.values(data['ds_clim']['stl1_max']));
  const climMinArr = [].concat.apply([], Object.values(data['ds_clim']['stl1_min']));

  const climCsvData = data['ds_clim'].time.map((item, index) => {
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
    <Card className={clsx(classes.root)}>
      <CardContent className="chart-grid">
        {
          data.pending ? (
            <>
              <Box className="chart-preload-container">
                <CircularProgress />
              </Box>
              <ChartSpecs
                type="temp"
                chartRef={chartRef}
                data={combinedCsvData(climCsvData, forcCsvData, histCsvData)}
                actionsState={actionsState}
              />
            </>
          ) : (
            <>
              <FlexibleWidthXYPlot
                className="flexible-chart"
                height={500}
                onMouseLeave={handleMouseLeave}
                yDomain={[Math.min(minYHistorical, minYForecast), Math.max(maxYHistorical, maxYForecast)]}
                xType="time"
                ref={chartRef}
                style={{ backgroundColor: '#fff' }}
                margin={{ top: 70 }}
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
                        y: Math.min(minYHistorical, minYForecast),
                      }, {
                        x: points.min.length ? points.min[0].x : points.max[0].x,
                        y: Math.max(maxYHistorical, maxYForecast),
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
                  text="Soll temperature"
                  className="main-titles"
                  includeMargin={false}
                  xPercent={0.035}
                  yPercent={0.1}
                />
                <XAxis
                  tickFormat={tickFormat}
                  tickTotal={points.chartWidth ? points.chartWidth / 45 : null}
                />
                <YAxis/>
              </FlexibleWidthXYPlot>
              <ChartSpecs
                type="temp"
                chartRef={chartRef}
                data={combinedCsvData(climCsvData, forcCsvData, histCsvData)}
                actionsState={actionsState}
              />
            </>
          )
        }
      </CardContent>
    </Card>
  );
};

export default SollTempChart;
