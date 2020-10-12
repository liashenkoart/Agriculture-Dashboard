import React, { useState, useCallback, memo } from 'react';

import TempChart from '../TempChart';
import PrecipitationChart from '../PrecipitationChart';
import ChartActions from '../ChartActions';

const TabView = () => {
  const [actionsState, setActionsState] = useState({
    isMonthly: true,
    currentTab: 'minmax',
  });

  const handleChangeAction = useCallback((state) => {
    setActionsState(state);
  }, [actionsState]);

  const renderComponent = useCallback(() => {
    switch (actionsState.currentTab) {
      case 'minmax':
        return <TempChart actionsState={actionsState} />;
      case 'precipitation':
        return <PrecipitationChart />;
    }
  }, [actionsState]);

  console.log(actionsState);

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
