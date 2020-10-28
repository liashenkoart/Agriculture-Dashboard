import React, { useCallback, useMemo, useRef, useState, useEffect, useContext, memo } from 'react';
import { Box, Card, CardContent, CircularProgress, Typography } from '@material-ui/core';
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
import { ToastContainer, toast } from 'react-toastify';

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
    coefficient: 0.3,
    error: false,
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
      setEvaporationData({
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
        coefficient: 0.3,
        error: false,
      });
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
              toast.error('Error occurred with server. Please, try later.');
            });
        });
    } else {
      setEvaporationData((prevData) => ({
        ...prevData,
        pending: true,
      }));
      setData((prevData) => ({
        ...prevData,
        pending: true,
      }));
      currentUser
        .getIdToken()
        .then(async (userToken) => {
          await networking.get(`/api/v1/weather/precipitation/daily/${id}`, {
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
              toast.error('Error occurred with server. Please, try later.');
            });
          return userToken;
        })
        .then(async (userToken) => {
          await networking.get(`/api/v1/weather/evaporation/daily/${id}`, {
            extraHeaders: { 'User-Token': userToken },
          })
            .then((res) => {
              setEvaporationData((prevState) => ({
                ...prevState,
                ...res.data,
                pending: false,
              }));
            })
            .catch(() => {
              setEvaporationData((prevData) => ({
                ...prevData,
                pending: false,
              }));
              toast.error('Error occurred with server. Please, try later.');
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
  const forecastTemp = useMemo(() => {
    return getForecastTemp(data['ds_fc'], historicalTemp[historicalTemp.length - 1], forecastArr);
  }, [data, forecastArr]);

  const { climLighten, climDarken } = useMemo(() => getClim(data['ds_clim']), [data]);

  const extraHistoricalTemp = useMemo(() => {
    try {
      return getExtraHistoricalTemp(historicalTemp, evaporationData['ds_hist'], evaporationData.coefficient);
    } catch (e) {
      actionsState.extraPrecipitationChart && toast.error('Problem ocurred processsing information');
      return [];
    }
  }, [evaporationData, historicalTemp]);

  const extraForecastArr = useMemo(() => {
    try {
      return getExtraForecastArr(evaporationData['ds_fc']);
    } catch (e) {
      return [];
    }
  }, [evaporationData]);
  const extraForecastTemp = useMemo(() => {
    try {
      return getExtraForecastTemp(
        forecastTemp,
        evaporationData['ds_fc'],
        extraForecastArr,
        extraHistoricalTemp[extraHistoricalTemp.length - 1],
        evaporationData.coefficient,
      );
    } catch (e) {
      return [];
    }
  }, [evaporationData, extraForecastArr, forecastTemp]);

  const { extraClimLighten, extraClimDarken } = useMemo(() => {
    try {
      return getExtraClim({ climLighten, climDarken }, evaporationData['ds_clim'], evaporationData.coefficient);
    } catch (e) {
      return [];
    }
  }, [evaporationData, climLighten, climDarken]);

  const minYHistorical = useMemo(() => getMinY(historicalTemp), [historicalTemp]);
  const maxYHistorical = useMemo(() => getMaxY(historicalTemp), [historicalTemp]);
  const minYForecast = useMemo(() => getMinY(forecastTemp), [forecastTemp]);
  const maxYForecast = useMemo(() => getMaxY(forecastTemp), [forecastTemp]);

  const extraMinYForecast = useMemo(() => getMinY(trimmData(extraForecastTemp)) * 10, [evaporationData.pending]);
  const extraMaxYForecast = useMemo(() => getMaxY(trimmData(extraForecastTemp)), [evaporationData.pending]);
  const extraMinYHistorical = useMemo(() => getMinY(trimmData(extraHistoricalTemp)) * 10, [evaporationData.pending]);
  const extraMaxYHistorical = useMemo(() => getMaxY(trimmData(extraHistoricalTemp)), [evaporationData.pending]);

  const histCsvData = data['ds_hist'].time.map((item, index) => {
    return [
      data['ds_hist']['tp_sum'][index],
    ];
  });

  const forcCsvData = data['ds_fc'].time.map((item, index) => {
    return [
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

  const combinedCsvData = (clim, forecast, historical) => {
    const csvArr = [];
    let j = 0;
    for (let i = 0; i <= clim.length; i++) {
      if (historical[i]) {
        csvArr.push([
          ...clim[i],
          [''],
          ...historical[i],
        ]);
      } else if (clim[i] && forecast[j]) {
        csvArr.push([
          ...clim[i],
          ...forecast[j],
          [''],
        ]);
        j += 1;
      } else if (clim[i]) {
        csvArr.push([
          ...clim[i],
          [''],
        ]);
      }
    }
    return csvArr;
  };

  const handleChangeSlider = useCallback((e, value) => {
    setEvaporationData((prevState) => ({
      ...prevState,
      coefficient: value,
    }));
  }, []);

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
                <Typography className="y-label">
                  {
                    !actionsState.extraPrecipitationChart ? 'Precipitation [mm]' : 'Water Budget [mm]'
                  }
                </Typography>
                <Box className="chart-preload-container">
                  <CircularProgress/>
                </Box>
                <ChartSpecs
                  type="precipitation"
                  chartRef={chartRef}
                  data={combinedCsvData(climCsvData, forcCsvData, histCsvData)}
                  actionsState={actionsState}
                  onSliderChange={handleChangeSlider}
                />
              </>
            ) : (
              <>
                <Typography className="y-label">
                  {
                    !actionsState.extraPrecipitationChart ? 'Precipitation [mm]' : 'Water Budget [mm]'
                  }
                </Typography>
                {
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
                      margin={{ top: 70 }}
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
                              data={extraClimLighten}
                              color="#C0E1EB"
                            />,
                            <AreaSeries
                              data={extraClimDarken}
                              color="#A0CBE0"
                            />,
                            <LineSeries
                              color="#237CB5"
                              data={extraHistoricalTemp}
                              curve="curveMonotoneX"
                              onSeriesMouseOver={handleMouseOver.bind({ target: 'historical' })}
                              onNearestX={handleSetPoints.bind({ target: 'historical' })}
                            />,
                            <LineSeries
                              color="#237CB5"
                              data={extraForecastTemp}
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
                                  Math.min(extraMinYHistorical, extraMinYForecast),
                              }, {
                                x: points.data[0].x,
                                y: !actionsState.extraPrecipitationChart ?
                                  Math.max(maxYForecast, maxYHistorical) :
                                  Math.max(extraMaxYHistorical, extraMaxYForecast),
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
                        text={!actionsState.extraPrecipitationChart ? 'Precipitation' : 'Water Budget'}
                        className="main-titles"
                        includeMargin={false}
                        xPercent={0.035}
                        yPercent={0.1}
                      />
                    </FlexibleWidthXYPlot>
                  </>
                }
                <ChartSpecs
                  type="precipitation"
                  chartRef={chartRef}
                  data={combinedCsvData(climCsvData, forcCsvData, histCsvData)}
                  actionsState={actionsState}
                  onSliderChange={handleChangeSlider}
                  disabled={!evaporationData.pending && !extraHistoricalTemp.length}
                />
              </>
            )
          }
        </CardContent>
      </Card>
      <ToastContainer />
    </>
  );
};

export default memo(PrecipitationChart);
