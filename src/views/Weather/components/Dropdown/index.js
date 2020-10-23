import React, { useState, useRef } from 'react';
import Dropdown from 'rc-dropdown';
import downloadSVG from 'export-svg-with-styles';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { withStyles } from '@material-ui/core';
import { CSVLink } from 'react-csv';
import { useParams } from 'react-router';

import { monthNames } from '../TempChart/helper';

import DownloadIcon from '../../../../assets/Chart/download.svg';
import ArrowDownBlue from '../../../../assets/Chart/arrow-down-blue.svg';
import DownloadIconWhite from '../../../../assets/Chart/download-white.svg';
import ArrowDownWhite from '../../../../assets/Chart/arrow-down-white.svg';

const CustomCheckbox = withStyles({
  root: {
    color: '#1A2935',
    '&$checked': {
      color: '#325588',
    },
  },
  checked: {},
})((props) => (
  <Checkbox
    color="default"
    style={{ width: 10, height: 10, padding: 0 }}
    icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 10 }} />}
    checkedIcon={<CheckBoxIcon style={{ fontSize: 10 }} />}
    {...props}
  />
));

const DropdownComponent = ({ cols, data, actionsState }) => {
  const { id } = useParams();
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

  let currentTab = actionsState.currentTab;

  if (actionsState.extraPrecipitationChart) {
    currentTab = 'water-budget';
  } else if (actionsState.extraHumidityChart) {
    currentTab = 'relative-humidity';
  }

  return (
    <Dropdown
      trigger="click"
      visible={state.visible}
      overlay={(
        <div className="content-dropdown">
          <p style={{ paddingLeft: 0, marginBottom: 10 }} className="dropdown-item-text">Export as </p>
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
            <p className="dropdown-item-text">Export as <span className="dropdown-item-text-bold">Png</span></p>
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
            <p className="dropdown-item-text">Export as <span className="dropdown-item-text-bold">CSV</span></p>
          </div>
          <div className="dropdown-item">
            <CustomCheckbox
              disableRipple
            />
            <p className="dropdown-item-text">Export <span className="dropdown-item-text-bold">hincast</span> data as CSV</p>
          </div>
          <CSVLink
            ref={linkRef}
            data={data}
            headers={cols}
            className="hidden-link"
            filename={`${id}_${new Date().getDate() + monthNames[new Date().getMonth()]}_${currentTab}.csv`}
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
        style={{
          backgroundColor: state.visible ? '#00548D' : '',
          color: state.visible ? '#fff' : '#00548D'
        }}
        onClick={() => {
          setState({
            ...state,
            visible: !state.visible
          })
        }}
      >
        <div className="buttonDropdownLeftSide">
          {
            !state.visible ? (
              <img src={DownloadIcon} alt=""/>
            ) : (
              <img src={DownloadIconWhite} alt=""/>
            )
          }
          Export
        </div>
        {
          !state.visible ? (
            <img src={ArrowDownBlue} alt=""/>
          ) : (
            <img src={ArrowDownWhite} alt=""/>
          )
        }
      </button>
    </Dropdown>
  );
};

export default DropdownComponent;
