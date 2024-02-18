import React, { useState, useEffect, useContext } from 'react';
import './RangeSlider.css'; // Import the CSS file

const RangeSlider = ({ GameListContext }) => {
  const [value, setValue] = useState(4);
  const dto = useContext(GameListContext)

  const getOptionStyle = (optionValue) => ({
    backgroundColor: value >= optionValue.toString() ? 'var(--palette-yellow)' : '#f2f2f2',
  });

  const setColumnStyle = (optionValue) => {
    setTimeout(() => {
      dto.Row.setRow(optionValue);
    }, 500);
    setValue(optionValue)
  }

  return (
    <div className="__range __range-step">
      <input
        type="range"
        value={value}
        max="4"
        min="2"
        step="1"
        list='range1'
        id="radius"
        onChange={(e) => setColumnStyle(e.target.value)}
      />
      <datalist className='datalist' id="range1">
        <option className='point' value="2" style={getOptionStyle(2)}>2</option>
        <option className='point' value="3" style={getOptionStyle(3)}>3</option>
        <option className='point' value="4" style={getOptionStyle(4)}>4</option>
      </datalist>

    </div>
  );
};

export default RangeSlider;
