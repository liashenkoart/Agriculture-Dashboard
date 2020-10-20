import React, { useState, useCallback, memo } from 'react';

import ChartActions from '../ChartActions';
import TempChart from '../TempChart';
import PrecipitationChart from '../PrecipitationChart';
import SollTempChart from '../SollTempChart';

const TabView = () => {
  const [actionsState, setActionsState] = useState({
    isMonthly: false,
    currentTab: 'minmax',
    extraDropdown: false,
    extraPrecipitationChart: false,
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
      case 'solltemp':
        return <SollTempChart actionsState={actionsState} />;
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
