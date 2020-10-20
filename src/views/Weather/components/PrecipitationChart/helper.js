const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getHistoricalTemp = (historical) => historical.time.map((item, index) => ({
  x: new Date(item).getTime(),
  y: historical['tp_sum'][index],
}));

const getExtraHistoricalTemp = (historical) => historical.time.map((item, index) => ({
  x: new Date(item).getTime(),
  y: historical['e_sum'][index],
}));

const getForecastArr = (forecast) => [].concat.apply([], Object.values(forecast['tp_sum']));

const getExtraForecastArr = (forecast) => [].concat.apply([], Object.values(forecast['e_sum']));

const getForecastTemp = (forecast, forecastMinArr) => forecast.time.map((item, index) => ({
  x: new Date(item).getTime(),
  y: forecastMinArr[index],
}));

const getExtraForecastTemp = (forecast, forecastMinArr) => forecast.time.map((item, index) => ({
  x: new Date(item).getTime(),
  y: forecastMinArr[index],
}));

const getClim = (clim) => {
  const climLightenY0Arr = [];
  const climLightenY1Arr = [];
  const climDarkenY0Arr = [];
  const climDarkenY1Arr = [];

  for (let key in clim['tp_sum']) {
    if (+key === 0.05) {
      climLightenY0Arr.push(...clim['tp_sum'][key]);
    } else if (+key === 0.95) {
      climLightenY1Arr.push(...clim['tp_sum'][key]);
    } else if (+key === 0.25) {
      climDarkenY0Arr.push(...clim['tp_sum'][key]);
    } else if (+key === 0.75) {
      climDarkenY1Arr.push(...clim['tp_sum'][key]);
    }
  }

  const climLighten = clim.time.map((item, index) => ({
    x: new Date(item).getTime(),
    y0: climLightenY0Arr[index],
    y: climLightenY1Arr[index],
  }));

  const climDarken = clim.time.map((item, index) => ({
    x: new Date(item).getTime(),
    y0: climDarkenY0Arr[index],
    y: climDarkenY1Arr[index],
  }));

  return {
    climLighten,
    climDarken,
  };
};

const getExtraClim = (clim) => {
  const climLightenY0Arr = [];
  const climLightenY1Arr = [];
  const climDarkenY0Arr = [];
  const climDarkenY1Arr = [];

  for (let key in clim['e_sum']) {
    if (+key === 0.05) {
      climLightenY0Arr.push(...clim['e_sum'][key]);
    } else if (+key === 0.95) {
      climLightenY1Arr.push(...clim['e_sum'][key]);
    } else if (+key === 0.25) {
      climDarkenY0Arr.push(...clim['e_sum'][key]);
    } else if (+key === 0.75) {
      climDarkenY1Arr.push(...clim['e_sum'][key]);
    }
  }

  const extraClimLighten = clim.time.map((item, index) => ({
    x: new Date(item).getTime(),
    y0: climLightenY0Arr[index],
    y: climLightenY1Arr[index],
  }));

  const extraClimDarken = clim.time.map((item, index) => ({
    x: new Date(item).getTime(),
    y0: climDarkenY0Arr[index],
    y: climDarkenY1Arr[index],
  }));

  return {
    extraClimLighten,
    extraClimDarken,
  };
};

const trimmData = (data) => data.filter((item) => {
  const minX = new Date().getTime() - 12 * 24 * 60 * 60 * 1000;
  const maxX = new Date().getTime() + 14 * 24 * 60 * 60 * 1000;
  return (minX <= item.x && item.x <= maxX);
});

const getMinY = (historicalTemp) => Math.min(...historicalTemp.map((d) => d.y));
const getMaxY = (historicalTemp) => Math.max(...historicalTemp.map((d) => d.y));

export {
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
}
