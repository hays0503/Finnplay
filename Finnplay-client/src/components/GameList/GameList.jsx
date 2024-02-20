import { useMemo, useContext, useEffect, useState, useRef,useCallback } from "react";
import PropTypes from "prop-types";
import sortfunc from "@utility/sortfunc.js";
import searchBySubstring from "@utility/searchBySubstring.js";
import "./GameList.css";

const GameList = ({ List, GameListContext }) => {
  const [getSelectGames, _setSelectGames] = useState([]);
  
  const { games, groups } = List;
  const defaultGames = useRef();
  const dto = useContext(GameListContext);

  /**
   * Sets the selected games and updates the games amount.
   * 
   * @param {Array} value - The array of selected games.
   */
  const setSelectGames = useCallback((value) => {
    _setSelectGames(value);
    dto.GamesAmount.setGamesAmount(value.length);
  }, [dto.GamesAmount]);


  /**
   * Функция для отображения списка игр по умолчанию.
   */
  const showDefault = useCallback(() => {
    let GameId = [];
    // Перебираем выбранные группы и извлекаем из них игры
    groups.forEach((element) => {
      GameId = [...GameId, ...element.games];
    });
    defaultGames.current = games.filter((game) => GameId.includes(game.id));
    setSelectGames(defaultGames.current);
  }, [games, groups, setSelectGames]);

  
  useEffect(() => {
    //Выбранные фильтры

    //Производитель
    const providerId = dto.Provider.getProvider;
    //Группа к какой относится игра
    const selectId = dto.Group.getGroup;

    let GameId = [];
    // Перебираем выбранные группы и извлекаем из них игры
    selectId.forEach((id) => {
      // Находим группу по id и извлекаем из неё игры
      const group = groups.find((e) => e.id === id);
      if (group && group.games.length > 0) {
        GameId = [...GameId, ...group.games];
      }
    });

    // Создание массива для выбранных игр
    let SelectGames = [];

    // Фильтруем игры по id, полученным из выбранных групп

    // Если ничего не выбрано
    if (GameId.length === 0 && providerId.length === 0) {
      showDefault();
      return; // Ранний выход, если ничего не выбрано
    }

    // Если выбраны оба фильтра
    if (GameId.length > 0 && providerId.length > 0) {
      SelectGames = defaultGames.current.filter(
        (game) =>
          GameId.includes(game.id) && providerId.includes(game.provider),
      );
    }
    // Если выбран только один фильтр: GameId
    else if (GameId.length > 0) {
      SelectGames = defaultGames.current.filter((game) =>
        GameId.includes(game.id),
      );
    }
    // Если выбран только один фильтр: providerId
    else if (providerId.length > 0) {
      SelectGames = defaultGames.current.filter((game) =>
        providerId.includes(game.provider),
      );
    }


    if (dto.sortingOptions.getSortingOptions.includes("A-Z")) {
      SelectGames = SelectGames.sort((a, b) => sortfunc(a.name, b.name));
    }

    if (dto.sortingOptions.getSortingOptions.includes("Z-A")) {
      SelectGames = SelectGames.sort((a, b) => sortfunc(b.name, a.name));
    }

    if (dto.sortingOptions.getSortingOptions.includes("Newest")) {
      SelectGames = SelectGames.sort((a, b) => sortfunc(a.date, b.date));
    }

    if (dto.Search.getSearch !== "") {
      SelectGames = searchBySubstring(SelectGames, dto.Search.getSearch);
    }    
    setSelectGames(SelectGames);
  }, [dto,groups,setSelectGames,showDefault]);

  const memoizedImages = useMemo(() => {

    const ClassNameMap = {
      4: "game-thumbnail-small",
      3: "game-thumbnail-medium",
      2: "game-thumbnail-large",
    };


    // Пересчет количества игр
    
    return getSelectGames.map((element) => (
      <img
        key={element.id}
        className={ClassNameMap[dto.Row.getRow]}
        loading="eager"
        alt={element.name}
        src={element.coverLarge}
      />
    ));
  }, [getSelectGames,dto.Row.getRow]); // Зависимости для пересчета useMemo

  return (
    <section
      className="games"
      style={{ maxWidth: `100%` }}
    >
      {memoizedImages}
    </section>
  );
};

GameList.propTypes = {
  List: PropTypes.object.isRequired,
  GameListContext: PropTypes.object.isRequired,
};


export default GameList;
