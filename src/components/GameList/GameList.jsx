import React, { useMemo, useContext, useEffect, useState, useRef } from "react";
import "./GameList.css";

const GameList = ({ List, GameListContext }) => {
  const [getSelectGames, _setSelectGames] = useState([]);
  
  const { games, groups, providers } = List;
  const defaultGames = useRef();
  const dto = useContext(GameListContext);

  /**
   * Sets the selected games and updates the games amount.
   * 
   * @param {Array} value - The array of selected games.
   */
  const setSelectGames = (value) => {
    _setSelectGames(value);
    dto.GamesAmount.setGamesAmount(value.length);
  }

  const ClassNameMap = {
    4: "game-thumbnail-small",
    3: "game-thumbnail-medium",
    2: "game-thumbnail-large",
  };

  /**
   * Функция для отображения списка игр по умолчанию.
   */
  const showDefault = () => {
    let GameId = [];
    // Перебираем выбранные группы и извлекаем из них игры
    groups.forEach((element) => {
      GameId = [...GameId, ...element.games];
    });
    defaultGames.current = games.filter((game) => GameId.includes(game.id));
    setSelectGames(defaultGames.current);
  };

  



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

    /**
     * Sorts two values in ascending order.
     * @param {any} a - The first value to compare.
     * @param {any} b - The second value to compare.
     * @returns {number} - Returns -1 if a is less than b, 1 if a is greater than b, and 0 if a is equal to b.
     */
    const sortfunc = (a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      // a должно быть равным b
      return 0;
    };

    /**
     * Filters a list of items based on a substring match in the item name.
     * @param {Array} list - The list of items to filter.
     * @param {string} substring - The substring to search for in the item names.
     * @returns {Array} - The filtered list of items.
     */
    const searchBySubstring = (list, substring) => {
      return list.filter((item) =>
        item.name.toLowerCase().includes(substring.toLowerCase()),
      );
    };

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
  }, [dto]);

  const memoizedImages = useMemo(() => {
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
  }, [getSelectGames]); // Зависимости для пересчета useMemo

  return (
    //row = 2  calc(100%/3) 5-2
    //row = 3  calc(100%/2) 5-3
    //row = 4  calc(100%/1) 5-4
    <section
      className="games"
      style={{ maxWidth: `100%` }}
    >
      {memoizedImages}
    </section>
  );
};

export default GameList;
