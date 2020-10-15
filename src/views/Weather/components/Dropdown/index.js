import React, { useState, useRef } from 'react';
import Dropdown from 'rc-dropdown';
import downloadSVG from 'export-svg-with-styles';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core';
import { CSVLink } from 'react-csv';

import DownloadIcon from '../../../../assets/Chart/download.svg';

const CustomCheckbox = withStyles({
  root: {
    color: '#325588',
    '&$checked': {
      color: '#325588',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const DropdownComponent = ({ cols, data }) => {
  const linkRef = useRef(null);
  const [state, setState] = useState({
    exportToPng: false,
    exportToCsv: false,
    visible: false,
  });

  const chart = document.getElementsByClassName('rv-xy-plot__inner')[0];
  let width, height;

  if (chart) {
    const rect = chart.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
  }

  const handleSubmitExport = () => {
    if (state.exportToPng && state.exportToCsv) {
      downloadSVG({
        width,
        height,
        svg: chart,
        filename: 'chart.png',
      });
      linkRef.current.link.click();
    } else if (state.exportToPng) {
      downloadSVG({
        width,
        height,
        svg: chart,
        filename: 'chart.png',
      });
    } else if (state.exportToCsv) {
      linkRef.current.link.click();
    }

    if (state.exportToCsv || state.exportToPng) {
      setState({
        ...state,
        exportToPng: false,
        exportToCsv: false,
        visible: false,
      });
    }
  };

  return (
    <Dropdown
      trigger="click"
      visible={state.visible}
      overlay={(
        <div className="content-dropdown">
          <div className="dropdown-item">
            <CustomCheckbox
              checked={state.exportToPng}
              onChange={() => {
                setState({
                  ...state,
                  exportToPng: !state.exportToPng,
                })
              }}
              disableRipple
            />
            <p className="dropdown-item-text">Export to Png</p>
          </div>
          <div className="dropdown-item">
            <CustomCheckbox
              checked={state.exportToCsv}
              onChange={() => {
                setState({
                  ...state,
                  exportToCsv: !state.exportToCsv,
                })
              }}
              disableRipple
            />
            <p className="dropdown-item-text">Export to CSV</p>
          </div>
          <CSVLink
            ref={linkRef}
            data={data}
            headers={cols}
            className="hidden-link"
            filename="chart.csv"
          />
          <button
            className="export-now"
            onClick={handleSubmitExport}
          >
            Export now
          </button>
        </div>
      )}
      animation="slide-up"
    >
      <button
        className="button-dropdown"
        onClick={() => {
          setState({
            ...state,
            visible: !state.visible
          })
        }}
      >
        Export
        <img src={DownloadIcon} alt=""/>
      </button>
    </Dropdown>
  );
};

export default DropdownComponent;
