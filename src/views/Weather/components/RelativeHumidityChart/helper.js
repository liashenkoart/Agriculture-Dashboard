const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getHistoricalTemp = (historical) => historical.time.map((item, index) => ({
  x: new Date(item).getTime(),
  y: historical['rh_mean'][index],
}));

const getForecastArr = (forecast) => forecast['rh_mean']['0.5'];

const getForecastTemp = (forecast, forecastMinArr) => forecast.time.map((item, index) => ({
  x: new Date(item).getTime(),
  y: forecastMinArr[index],
}));

const getClim = (clim) => {
  const climLightenY0Arr = [];
  const climLightenY1Arr = [];
  const climDarkenY0Arr = [];
  const climDarkenY1Arr = [];

  for (let key in clim['rh_mean']) {
    if (+key === 0.05) {
      climLightenY0Arr.push(...clim['rh_mean'][key]);
    } else if (+key === 0.95) {
      climLightenY1Arr.push(...clim['rh_mean'][key]);
    } else if (+key === 0.25) {
      climDarkenY0Arr.push(...clim['rh_mean'][key]);
    } else if (+key === 0.75) {
      climDarkenY1Arr.push(...clim['rh_mean'][key]);
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
  getForecastArr,
  getForecastTemp,
  getClim,
  getMinY,
  getMaxY,
  trimmData,
}
