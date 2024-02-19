import React, { useState, useEffect, useContext } from 'react';
import './RangeSlider.css'; // Import the CSS file

const RangeSlider = ({ GameListContext }) => {
  const [value, setValue] = useState(4);
  const dto = useContext(GameListContext)

  const getOptionStyle = (optionValue) => ({
    backgroundColor: value >= optionValue.toString() ? 'var(--palette-yellow)' : 'gray',
  });

  const setColumnStyle = (optionValue) => {
    // setTimeout(() => {
      dto.Row.setRow(optionValue);
    // }, 1000);
    setValue(optionValue)
  }

  return (
      <div className="range-slider" style={{display:'contents'}}>
        <div className="range">
          <div className="range">
            <input
              id="range1"
              type="range"
              min="2"
              max="4"
              step="1"
              value={value}
              onChange={(e) => setColumnStyle(e.target.value)}
            />
            <div className="range-ticks">
              <span className="range-tick" id="2">
                <span style={getOptionStyle(2)} className="range-tick-text">
                  2
                </span>
              </span>
              <span className="range-tick" id="3">
                <span style={getOptionStyle(3)} className="range-tick-text">
                  3
                </span>
              </span>
              <span className="range-tick" id="4">
                <span style={getOptionStyle(4)} className="range-tick-text">
                  4
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default RangeSlider;
