import React, { useState, useCallback, memo } from 'react';

import TempChart from '../TempChart';
import PrecipitationChart from '../PrecipitationChart';
import ChartActions from '../ChartActions';

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
