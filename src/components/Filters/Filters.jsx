import React, { memo } from "react";
import RangeSlider from "@components/RangeSlider/RangeSlider";
import "./Filters.css"; // Используем CSS модули для локализации стилей

const ProviderFrame = ({ title, children }) => (
  <div className="provider-list">
    <div className="providers-title">{title}</div>
    <div className="row-provider">
      {children}
    </div>
  </div>
);

const Filters = memo(({GameListContext,List}) => {
  console.log(List)
  const { providers, groups } = List;
  const sortingOptions = ["A-Z", "Z-A", "Newest"];
  console.log(providers,groups,sortingOptions)

  return (
    <div className="filters">
      <div className="input">
        <div className="inputs-text-field">
          <input className="text-field-content" placeholder="Search" type="text" />
          <img className="searchIcon" alt="" src="/icons--search-16px.svg" />
        </div>
      </div>
      <ProviderFrame title="Providers">
        {providers.map((provider) => (
          <label key={provider.id} className="checkbox-as-button">
            <input type="checkbox" className="checkbox-as-button__input" />
            <span className="providers checkbox-as-button__label">{provider.name}</span>
          </label>
        ))}
      </ProviderFrame>

      <ProviderFrame title="Game groups">
        {groups.map((group) => (
          <label key={group.id} className="checkbox-as-button">
            <input type="checkbox" className="checkbox-as-button__input" />
            <span className="providers checkbox-as-button__label">{group.name}</span>
          </label>

        ))}
      </ProviderFrame>

      <ProviderFrame title="Game groups">
        {sortingOptions.map((option) => (
          <label key={option} className="checkbox-as-button">
            <input type="checkbox" className="checkbox-as-button__input" />
            <span className="providers checkbox-as-button__label">{option}</span>
          </label>
        ))}
      </ProviderFrame>
      
      <div style={{width: '100%'}}><RangeSlider GameListContext={GameListContext}/></div>

      <div className="sectionBottom">
        <span>Games amount: 3800</span>
        <button className="resetButton">Reset</button>
      </div>
    </div>
  );
});

export default Filters;
