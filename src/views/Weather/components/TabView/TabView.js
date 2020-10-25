import React, { useState, useCallback, memo } from 'react';

import ChartActions from '../ChartActions';
import TempChart from '../TempChart';
import PrecipitationChart from '../PrecipitationChart';
import SoilTempChart from '../SoilTempChart';
import RelativeHumidityChart from '../RelativeHumidityChart';
import EvapotranspirationChart from '../EvapotranspirationChart';

const TabView = () => {
  const [actionsState, setActionsState] = useState({
    isMonthly: false,
    currentTab: 'minmax',
    extraDropdown: false,
    extraPrecipitationChart: false,
    extraEvapotranspirationChart: false,
    extraHumidityChart: false,
    additional2: false,
    additional3: false,
    additional4: false,
  });

  const handleChangeAction = useCallback((state) => {
    setActionsState(state);
  }, [actionsState]);

  const renderComponent = useCallback(() => {
    switch (actionsState.currentTab) {
      case 'minmax':
        return <TempChart actionsState={actionsState} />;
      case 'precipitation':
        return <PrecipitationChart actionsState={actionsState} />;
      case 'soil':
        return <SoilTempChart actionsState={actionsState} />;
    }

    if (actionsState.extraHumidityChart) {
      return <RelativeHumidityChart actionsState={actionsState} />;
    } else if (actionsState.extraEvapotranspirationChart) {
      return <EvapotranspirationChart actionsState={actionsState} />
    }
  }, [actionsState]);

  return (
    <>
      <ChartActions
        initialState={actionsState}
        onStateChange={handleChangeAction}
      />
      {renderComponent()}
    </>
  )
};

export default TabView;
