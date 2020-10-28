import React, { useCallback, useMemo, useRef, useState, useEffect, useContext } from 'react';
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
import { toast, ToastContainer } from 'react-toastify';

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
      'rh_mean': [],
    },
    'ds_fc': {
      time: [],
      'rh_mean': [],
    },
    'ds_clim': {
      time: [],
      'rh_mean': [],
    },
    pending: true,
  });

  useEffect(() => {
    setPoints((prevState) => ({
      ...prevState,
      chartWidth: data.pending ? 0 : chartRef.current.offsetWidth,
    }));
  }, [chartRef.current, data.pending]);

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      pending: true,
    }));
    currentUser
      .getIdToken()
      .then((userToken) => {
        networking.get(`/api/v1/weather/relative_humidity/daily/${id}`, {
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
  }, []);

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
    return getForecastTemp(data['ds_fc'], forecastArr);
  }, [data, forecastArr]);

  const { climLighten, climDarken } = useMemo(() => getClim(data['ds_clim']), [data]);

  const minYHistorical = useMemo(() => getMinY(historicalTemp), [historicalTemp]);
  const maxYHistorical = useMemo(() => getMaxY(historicalTemp), [historicalTemp]);
  const minYForecast = useMemo(() => getMinY(forecastTemp), [forecastTemp]);
  const maxYForecast = useMemo(() => getMaxY(forecastTemp), [forecastTemp]);

  const histCsvData = data['ds_hist'].time.map((item, index) => {
    return [
      item,
      data['ds_hist']['rh_mean'][index],
    ];
  });

  const forcCsvData = data['ds_fc'].time.map((item, index) => {
    return [
      item,
      forecastArr[index],
    ];
  });

  const climArr = [].concat.apply([], Object.values(data['ds_clim']['rh_mean']));

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
            data.pending ? (
              <>
                <Typography className="y-label">
                  RH [%]
                </Typography>
                <Box className="chart-preload-container">
                  <CircularProgress/>
                </Box>
                <ChartSpecs
                  type="precipitation"
                  chartRef={chartRef}
                  data={combinedCsvData(climCsvData, forcCsvData, histCsvData)}
                  actionsState={actionsState}
                />
              </>
            ) : (
              <>
                <Typography className="y-label">
                  RH [%]
                </Typography>
                <FlexibleWidthXYPlot
                  className="flexible-chart"
                  height={500}
                  xType="time"
                  onMouseLeave={handleMouseLeave}
                  ref={chartRef}
                  yDomain={[Math.min(minYHistorical, minYForecast), Math.max(maxYHistorical, maxYForecast)]}
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
                  <AreaSeries
                    data={!actionsState.isMonthly ? trimmData(climLighten) : climLighten}
                    color="#BEE2EB"
                  />
                  <AreaSeries
                    data={!actionsState.isMonthly ? trimmData(climDarken) : climDarken}
                    color="#89D4E1"
                  />
                  <LineSeries
                    color="#237CB5"
                    data={!actionsState.isMonthly ? trimmData(historicalTemp) : historicalTemp}
                    curve="curveMonotoneX"
                    onSeriesMouseOver={handleMouseOver.bind({ target: 'historical' })}
                    onNearestX={handleSetPoints.bind({ target: 'historical' })}
                  />
                  <LineSeries
                    color="#237CB5"
                    data={!actionsState.isMonthly ? trimmData(forecastTemp) : forecastTemp}
                    curve="curveMonotoneX"
                    strokeStyle="dashed"
                    onSeriesMouseOver={handleMouseOver.bind({ target: 'forecast' })}
                    onNearestX={handleSetPoints.bind({ target: 'forecast' })}
                  />
                  {
                    points.data.length ? (
                      [
                        <LineSeries
                          data={[{
                            x: points.data[0].x,
                            y: Math.min(minYForecast, minYHistorical),
                          }, {
                            x: points.data[0].x,
                            y: Math.max(maxYForecast, maxYHistorical),
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
                      type="relative-humidity"
                      points={points}
                    />
                  </Crosshair>
                  <ChartLabel
                    text="Relative Humidity"
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
                  actionsState={actionsState}
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

export default PrecipitationChart;
