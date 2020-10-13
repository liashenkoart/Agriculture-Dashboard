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

import {
  monthNames,
  getHistoricalTemp,
  getForecastArr,
  getForecastTemp,
  getClim,
  getMinY,
  getMaxY,
} from './helper';

import historical from '../../../../data/historical_tp';
import forecast from '../../../../data/forecast_tp';
import clim from '../../../../data/clim_tp';

import clsx from 'clsx';
import ChartSpecs from '../ChartSpecs';
import ChartViewer from '../ChartViewer';

const PrecipitationChart = () => {
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
                onMouseLeave={handleMouseLeave}
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
                  onSeriesMouseOver={handleMouseOver.bind({ target: 'historical' })}
                  onNearestX={handleSetPoints.bind({ target: 'historical' })}
                />
                <LineSeries
                  color="#237CB5"
                  data={forecastTemp}
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
