import React, { useCallback, useMemo, useRef, useState, useEffect, useContext } from 'react';
import { Box, Card, CardContent, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
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
  ChartLabel
} from 'react-vis';

import {
  monthNames,
  getHistoricalTemp,
  getExtraHistoricalTemp,
  getForecastArr,
  getExtraForecastArr,
  getForecastTemp,
  getExtraForecastTemp,
  getClim,
  getExtraClim,
  getMinY,
  getMaxY,
  trimmData,
} from './helper';

import clsx from 'clsx';
import ChartSpecs from '../ChartSpecs';
import ChartViewer from '../ChartViewer';
import networking from '../../../../Util/Networking';
import { AuthContext } from '../../../../Auth/Auth';

const PrecipitationChart = ({ actionsState }) => {
  const chartRef = useRef(null);
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();

  const initialState = {
    data: [],
    target: '',
    chartWidth: 0,
  };

  const [points, setPoints] = useState(initialState);

  const [data, setData] = useState({
    'ds_hist': {
      time: [],
      'tp_sum': [],
    },
    'ds_fc': {
      time: [],
      'tp_sum': [],
    },
    'ds_clim': {
      time: [],
      'tp_sum': [],
    },
    pending: true,
  });

  const [evaporationData, setEvaporationData] = useState({
    'ds_hist': {
      time: [],
      'e_sum': [],
    },
    'ds_fc': {
      time: [],
      'e_sum': [],
    },
    'ds_clim': {
      time: [],
      'e_sum': [],
    },
    pending: true,
  });

  useEffect(() => {
    setPoints((prevState) => ({
      ...prevState,
      chartWidth: data.pending || evaporationData.pending ? 0 : chartRef.current.offsetWidth,
    }));
  }, [chartRef.current, data.pending]);

  useEffect(() => {
    if (!actionsState.extraPrecipitationChart) {
      setData((prevData) => ({
        ...prevData,
        pending: true,
      }));
      currentUser
        .getIdToken()
        .then((userToken) => {
          networking.get(`/api/v1/weather/precipitation/daily/${id}`, {
            extraHeaders: { 'User-Token': userToken },
          })
            .then((res) => {
              setData({
                ...res.data,
                pending: false,
              });
            })
            .catch(() => {
              setData((prevData) => ({
                ...prevData,
                pending: false,
              }));
            });
        });
    } else {
      setEvaporationData((prevData) => ({
        ...prevData,
        pending: true,
      }));
      currentUser
        .getIdToken()
        .then((userToken) => {
          networking.get(`/api/v1/weather/evaporation/daily/${id}`, {
            extraHeaders: { 'User-Token': userToken },
          })
            .then((res) => {
              setEvaporationData({
                ...res.data,
                pending: false,
              });
            })
            .catch(() => {
              setEvaporationData((prevData) => ({
                ...prevData,
                pending: false,
              }));
            });
        });
    }
  }, [actionsState.extraPrecipitationChart]);

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

  const historicalTemp = useMemo(() => getHistoricalTemp(data['ds_hist']), [data]);

  const forecastArr = useMemo(() => getForecastArr(data['ds_fc']), [data]);
  const forecastTemp = useMemo(() => getForecastTemp(data['ds_fc'], forecastArr), [data, forecastArr]);

  const { climLighten, climDarken } = useMemo(() => getClim(data['ds_clim']), [data]);

  const extraHistoricalTemp = useMemo(() => getExtraHistoricalTemp(evaporationData['ds_hist']), [evaporationData]);

  const extraForecastArr = useMemo(() => getExtraForecastArr(evaporationData['ds_fc']), [evaporationData]);
  const extraForecastTemp = useMemo(() => getExtraForecastTemp(evaporationData['ds_fc'], extraForecastArr), [evaporationData, extraForecastArr]);

  const { extraClimLighten, extraClimDarken } = useMemo(() => getExtraClim(evaporationData['ds_clim']), [evaporationData]);

  const minYHistorical = useMemo(() => getMinY(historicalTemp), [historicalTemp]);
  const maxYHistorical = useMemo(() => getMaxY(historicalTemp), [historicalTemp]);
  const minYForecast = useMemo(() => getMinY(forecastTemp), [forecastTemp]);
  const maxYForecast = useMemo(() => getMaxY(forecastTemp), [forecastTemp]);

  const extraMinYHistorical = useMemo(() => getMinY(extraHistoricalTemp), [extraHistoricalTemp]);
  const extraMaxYHistorical = useMemo(() => getMaxY(extraHistoricalTemp), [extraHistoricalTemp]);
  const extraMinYForecast = useMemo(() => getMinY(extraForecastTemp), [extraForecastTemp]);
  const extraMaxYForecast = useMemo(() => getMaxY(extraForecastTemp), [extraForecastTemp]);

  const histCsvData = data['ds_hist'].time.map((item, index) => {
    return [
      item,
      data['ds_hist']['tp_sum'][index],
    ];
  });

  const forcCsvData = data['ds_fc'].time.map((item, index) => {
    return [
      item,
      forecastArr[index],
    ];
  });

  const climArr = [].concat.apply([], Object.values(data['ds_clim']['tp_sum']));

  const climCsvData = data['ds_clim'].time.map((item, index) => {
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
      <Card className={clsx(classes.root)}>
        <CardContent className="chart-grid">
          {
            (data.pending && !actionsState.extraPrecipitationChart) || (evaporationData.pending && actionsState.extraPrecipitationChart) ? (
              <>
                <Box className="chart-preload-container">
                  <CircularProgress/>
                </Box>
                <ChartSpecs
                  type="temp"
                  chartRef={chartRef}
                  data={combinedCsvData(climCsvData, forcCsvData, histCsvData)}
                />
              </>
            ) : (
              <>
                <FlexibleWidthXYPlot
                  className="flexible-chart"
                  height={500}
                  xType="time"
                  onMouseLeave={handleMouseLeave}
                  ref={chartRef}
                  yDomain={
                    !actionsState.extraPrecipitationChart ?
                      [Math.min(minYHistorical, minYForecast), Math.max(maxYHistorical, maxYForecast)] :
                      [Math.min(extraMinYHistorical, extraMinYForecast), Math.max(extraMaxYHistorical, extraMaxYForecast)]
                  }
                  style={{ backgroundColor: '#fff' }}
                >
                  <VerticalGridLines/>
                  <HorizontalGridLines/>
                  <XAxis
                    tickFormat={tickFormat}
                    tickTotal={points.chartWidth ? points.chartWidth / 45 : null}
                  />
                  <YAxis/>
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
                            y: !actionsState.extraPrecipitationChart ?
                              Math.min(minYForecast, minYHistorical) :
                              Math.min(extraMinYForecast, extraMinYHistorical),
                          }, {
                            x: points.data[0].x,
                            y: !actionsState.extraPrecipitationChart ?
                              Math.max(maxYForecast, maxYHistorical) :
                              Math.max(extraMaxYForecast, extraMaxYHistorical),
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
                <ChartSpecs
                  type="precipitation"
                  chartRef={chartRef}
                  data={combinedCsvData(climCsvData, forcCsvData, histCsvData)}
                />
              </>
            )
          }
        </CardContent>
      </Card>
    </>
  );
};

export default PrecipitationChart;
