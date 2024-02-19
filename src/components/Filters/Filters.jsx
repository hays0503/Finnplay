import React, { memo,useContext, useEffect, useId } from "react";
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

const Filters = memo(({ GameListContext, List }) => {
  const { providers, groups } = List;
  const sortingOptions = ["A-Z", "Z-A", "Newest"];

  const dto = useContext(GameListContext);

  const toggle = (event,id,getData,setData) => {
    //Удаляем или добавляем
    if(event.target.checked){
      //Добавляем
      setData([...getData,id]);
    }else{
      //удаляем
      const arr = getData.filter(item => item !== id);
      setData(arr);
    }
  }

  const toggleGroup = (event,id) => {
    toggle(event,id,dto.Group.getGroup,dto.Group.setGroup);
  }

  const toggleProvider = (event,id) => {
    toggle(event,id,dto.Provider.getProvider,dto.Provider.setProvider);
  }

  const toggleSortingOptions = (event,id) => {
    toggle(event,id,dto.sortingOptions.getSortingOptions,dto.sortingOptions.setSortingOptions);
  }

  const setSearch = (event) => {
    dto.Search.setSearch(event.target.value);
  }



  return (
    <div className="filters">
      <div className="input">
        <div className="inputs-text-field">
          <input className="text-field-content" onChange={(event)=>setSearch(event)} placeholder="Search" type="text" />
          <img className="searchIcon" alt="" src="/icons--search-16px.svg" />
        </div>
      </div>
      <ProviderFrame title="Providers">
        {providers.map((provider,index) => {
          // console.log(provider.id)
          return (
            <label key={useId()} className="checkbox-as-button">
              <input type="checkbox" onChange={(event) => toggleProvider(event,provider.id)} className="checkbox-as-button__input" />
              <span className="providers checkbox-as-button__label">{provider.name}</span>
            </label>
          )
        })}
      </ProviderFrame>

      <ProviderFrame title="Game groups">
        {groups.map((group,index) => (
          <label key={useId()} className="checkbox-as-button">
            <input type="checkbox" onChange={(event)=>toggleGroup(event,group.id)} className="checkbox-as-button__input" />
            <span className="providers checkbox-as-button__label">{group.name}</span>
          </label>

        ))}
      </ProviderFrame>

      <ProviderFrame title="Sorting">
        {sortingOptions.map((option,index) => (
          <label key={useId()} className="checkbox-as-button">
            <input type="checkbox" onChange={(event)=>toggleSortingOptions(event,option)} className="checkbox-as-button__input" />
            <span className="providers checkbox-as-button__label">{option}</span>
          </label>
        ))}
      </ProviderFrame>

      <div style={{ width: '100%' }}><RangeSlider GameListContext={GameListContext} /></div>

      <div className="sectionBottom">
        <span>Games amount: 3800</span>
        <button className="resetButton">Reset</button>
      </div>
    </div>
  );
});

export default Filters;
