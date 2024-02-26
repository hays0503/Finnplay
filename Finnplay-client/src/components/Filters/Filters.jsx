import { useContext, useState } from "react";
import PropTypes from "prop-types";
import RangeSlider from "@components/RangeSlider/RangeSlider";
import debounce from "@utility/debounce";
import "./Filters.css"; // Используем CSS модули для локализации стилей

/**
 * Renders a provider frame component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the provider frame.
 * @param {ReactNode} props.children - The children components to be rendered inside the provider frame.
 * @returns {ReactNode} The rendered provider frame component.
 */
const ProviderFrame = ({ title, children }) => (
  <div className="provider-list">
    <div className="providers-title">{title}</div>
    <div className="row-provider">{children}</div>
  </div>
);

ProviderFrame.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

/**
 * Renders a component for filtering game lists.
 *
 * @component
 * @param {Object} GameListContext - The context object for game list data.
 * @param {Object} List - The list of providers and groups.
 * @returns {JSX.Element} The Filters component.
 */
const Filters = ({ GameListContext, List }) => {
  const { providers, groups } = List;
  const sortingOptions = ["A-Z", "Z-A", "Newest"];
  const dto = useContext(GameListContext);
  const debounced = debounce(dto.Search.setSearch, 1500);
  const [isVisable, setIsVisable] = useState(false);

  const toggle = (event, id, getData, setData) => {
    //Удаляем или добавляем
    if (event.target.checked) {
      //Добавляем
      setData([...getData, id]);
    } else {
      //удаляем
      const arr = getData.filter((item) => item !== id);
      setData(arr);
    }
  };

  const toggleGroup = (event, id) => {
    toggle(event, id, dto.Group.getGroup, dto.Group.setGroup);
  };

  const toggleProvider = (event, id) => {
    toggle(event, id, dto.Provider.getProvider, dto.Provider.setProvider);
  };

  const toggleSortingOptions = (event, id) => {
    toggle(
      event,
      id,
      dto.sortingOptions.getSortingOptions,
      dto.sortingOptions.setSortingOptions
    );
  };

  const setSearch = (event) => {
    //Делаем дебаунс для поиска
    //Поиск будет происходить только после того как пользователь перестанет вводить
    //console.log("debounce start");
    debounced(event.target.value);
  };

  const ResetDto = () => {
    //Грязный хак, но работает просто обновим страницу
    location.reload();
  };

  return (
    <div className="containerFilter">
      <div style={{ display: `${isVisable ? "" : "none"}` }}>
        <div className="filters">
          <div className="input">
            <div className="inputs-text-field">
              <input
                className="text-field-content"
                onChange={(event) => setSearch(event)}
                placeholder="Search"
                type="text"
              />
              <img
                className="searchIcon"
                alt=""
                src="/icons--search-16px.svg"
              />
            </div>
          </div>
          <ProviderFrame title="Providers">
            {providers.map((provider) => {
              return (
                <label key={provider.id} className="checkbox-as-button">
                  <input
                    type="checkbox"
                    onChange={(event) => toggleProvider(event, provider.id)}
                    className="checkbox-as-button__input"
                  />
                  <span className="providers checkbox-as-button__label">
                    {provider.name}
                  </span>
                </label>
              );
            })}
          </ProviderFrame>

          <ProviderFrame title="Game groups">
            {groups.map((group) => (
              <label key={group.id} className="checkbox-as-button">
                <input
                  type="checkbox"
                  onChange={(event) => toggleGroup(event, group.id)}
                  className="checkbox-as-button__input"
                />
                <span className="providers checkbox-as-button__label">
                  {group.name}
                </span>
              </label>
            ))}
          </ProviderFrame>

          <ProviderFrame title="Sorting">
            {sortingOptions.map((option) => (
              <label key={option} className="checkbox-as-button">
                <input
                  type="checkbox"
                  onChange={(event) => toggleSortingOptions(event, option)}
                  className="checkbox-as-button__input"
                />
                <span className="providers checkbox-as-button__label">
                  {option}
                </span>
              </label>
            ))}
          </ProviderFrame>

          <div style={{ width: "100%" }}>
            <RangeSlider GameListContext={GameListContext} />
          </div>

          <div className="sectionBottom">
            <div className="games-amount">
              Games amount: {dto.GamesAmount.getGamesAmount}
            </div>

            <button className="resetButton" onClick={() => ResetDto()}>
              Reset
            </button>
          </div>
        </div>
      </div>

      <div onClick={()=>setIsVisable(!isVisable)} className="burger">
        <img src="./burger.svg" />
        <span style={{ color: "#3F53BE" }}>Hide filters</span>
      </div>
    </div>
  );
};

Filters.propTypes = {
  GameListContext: PropTypes.object.isRequired,
  List: PropTypes.object.isRequired,
};

export default Filters;
