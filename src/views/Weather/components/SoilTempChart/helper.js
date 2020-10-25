const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getHistoricalMinTemp = (historical) => {
  return historical.time.map((item, index) => ({
    x: new Date(item).getTime(),
    y: historical['stl1_min'][index],
  }));
}

const getHistoricalMaxTemp = (historical) => historical.time.map((item, index) => ({
  x: new Date(item).getTime(),
  y: historical['stl1_max'][index],
}));

const getMinY = (historicalMinTemp) => Math.min(...historicalMinTemp.map((d) => d.y));
const getMaxY = (historicalMaxTemp) => Math.max(...historicalMaxTemp.map((d) => d.y));

const getForecastMinArr = (forecast) => forecast['stl1_min']['0.5'];
const getForecastMaxArr = (forecast) => forecast['stl1_max']['0.5'];

const getForecastMinTemp = (forecast, forecastMinArr) => forecast.time.map((item, index) => ({
  x: new Date(item).getTime(),
  y: forecastMinArr[index],
}));

const getForecastMaxTemp = (forecast, forecastMaxArr) => forecast.time.map((item, index) => ({
  x: new Date(item).getTime(),
  y: forecastMaxArr[index],
}));

const getClimMin = (clim) => {
  const climMinLightenY0Arr = [];
  const climMinLightenY1Arr = [];
  const climMinDarkenY0Arr = [];
  const climMinDarkenY1Arr = [];

  for (let key in clim['stl1_min']) {
    if (+key === 0.05) {
      climMinLightenY0Arr.push(...clim['stl1_min'][key]);
    } else if (+key === 0.95) {
      climMinLightenY1Arr.push(...clim['stl1_min'][key]);
    } else if (+key === 0.25) {
      climMinDarkenY0Arr.push(...clim['stl1_min'][key]);
    } else if (+key === 0.75) {
      climMinDarkenY1Arr.push(...clim['stl1_min'][key]);
    }
  }

  const climMinLighten = clim.time.map((item, index) => ({
    x: new Date(item).getTime(),
    y0: climMinLightenY0Arr[index],
    y: climMinLightenY1Arr[index],
  }));

  const climMinDarken = clim.time.map((item, index) => ({
    x: new Date(item).getTime(),
    y0: climMinDarkenY0Arr[index],
    y: climMinDarkenY1Arr[index],
  }));

  return {
    climMinLighten,
    climMinDarken,
  };
};

const getClimMax = (clim) => {
  const climMaxLightenY0Arr = [];
  const climMaxLightenY1Arr = [];
  const climMaxDarkenY0Arr = [];
  const climMaxDarkenY1Arr = [];

  for (let key in clim['stl1_max']) {
    if (+key === 0.05) {
      climMaxLightenY0Arr.push(...clim['stl1_max'][key]);
    } else if (+key === 0.95) {
      climMaxLightenY1Arr.push(...clim['stl1_max'][key]);
    } else if (+key === 0.25) {
      climMaxDarkenY0Arr.push(...clim['stl1_max'][key]);
    } else if (+key === 0.75) {
      climMaxDarkenY1Arr.push(...clim['stl1_max'][key]);
    }
  }

  const climMaxLighten = clim.time.map((item, index) => {
    return {
      x: new Date(item).getTime(),
      y0: climMaxLightenY0Arr[index],
      y: climMaxLightenY1Arr[index],
    }
  });

  const climMaxDarken = clim.time.map((item, index) => {
    return {
      x: new Date(item).getTime(),
      y0: climMaxDarkenY0Arr[index],
      y: climMaxDarkenY1Arr[index],
    }
  });

  return {
    climMaxLighten,
    climMaxDarken,
  };
}

const trimmData = (data) => data.filter((item) => {
  const minX = new Date().getTime() - 12 * 24 * 60 * 60 * 1000;
  const maxX = new Date().getTime() + 14 * 24 * 60 * 60 * 1000;
  return (minX <= item.x && item.x <= maxX);
});

const minX = new Date().getTime() - 12 * 24 * 60 * 60 * 1000;
const maxX = new Date().getTime() + 14 * 24 * 60 * 60 * 1000;

export {
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
  minX,
  maxX,
}
