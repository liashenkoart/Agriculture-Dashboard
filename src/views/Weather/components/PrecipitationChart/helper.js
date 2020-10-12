const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getHistoricalTemp = (historical) => historical.time.map((item, index) => ({
  x: new Date(item).getTime(),
  y: historical['tp_sum'][index],
}));

const getForecastArr = (forecast) => [].concat.apply([], Object.values(forecast['tp_sum']));

const getForecastTemp = (forecast, forecastMinArr) => forecast.time.map((item, index) => ({
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

export {
  monthNames,
  getHistoricalTemp,
  getForecastArr,
  getForecastTemp,
  getClim,
}