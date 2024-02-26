import {
  useMemo,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import ImageWithFallback from "@components/Image/ImageWithFallback";
import PropTypes from "prop-types";
import sortfunc from "@utility/sortfunc.js";
import searchBySubstring from "@utility/searchBySubstring.js";
import "./GameList.css";

const GameGallery = ({ getSelectGames, columns }) => {
  // Используем inline стиль для динамического определения количества колонок
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`, // Динамическое создание колонок
    gap: "20px", // Отступы между элементами сетки
  };

  return (
    <div style={gridStyle}>
      {getSelectGames.map((element) => {
        return <ImageWithFallback          
          key={element.id}
          className="game-image"
          loading="eager"
          alt={element.name}
          src={element.coverLarge}
        />;
      })}
    </div>
  );
};

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
  const setSelectGames = useCallback(
    (value) => {
      _setSelectGames(value);
      dto.GamesAmount.setGamesAmount(value.length);
    },
    [dto.GamesAmount]
  );

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

    showDefault();

    // Создание массива для выбранных игр
    let SelectGames = defaultGames.current;



    // Фильтруем игры по id, полученным из выбранных групп



    // Если выбраны оба фильтра
    if (GameId.length > 0 && providerId.length > 0) {
      SelectGames = defaultGames.current.filter(
        (game) => GameId.includes(game.id) && providerId.includes(game.provider)
      );
    }
    // Если выбран только один фильтр: GameId
    else if (GameId.length > 0) {
      SelectGames = defaultGames.current.filter((game) =>
        GameId.includes(game.id)
      );
    }
    // Если выбран только один фильтр: providerId
    else if (providerId.length > 0) {
      SelectGames = defaultGames.current.filter((game) =>
        providerId.includes(game.provider)
      );
    }

    /*
     * Поиск по подстроке в названии игры
     */
    if (dto.Search.getSearch !== "") {
      // Если ничего не выбрано из фильров(Providers/Game groups/Sorting),
      // то берем игры по умолчанию и ищем по ним
      SelectGames = SelectGames.length > 0 ? SelectGames : defaultGames.current;
      SelectGames = searchBySubstring(SelectGames, dto.Search.getSearch);
    }

    if (dto.sortingOptions.getSortingOptions.includes("A-Z")) {
      SelectGames = SelectGames.length > 0 ? SelectGames : defaultGames.current;
      SelectGames = SelectGames.sort((a, b) => sortfunc(a.name, b.name));
    }

    if (dto.sortingOptions.getSortingOptions.includes("Z-A")) {
      SelectGames = SelectGames.length > 0 ? SelectGames : defaultGames.current;
      SelectGames = SelectGames.sort((a, b) => sortfunc(b.name, a.name));
    }

    if (dto.sortingOptions.getSortingOptions.includes("Newest")) {
      SelectGames = SelectGames.length > 0 ? SelectGames : defaultGames.current;
      console.log("Newest",SelectGames);
      SelectGames = SelectGames.sort((a, b) => sortfunc(b.date,a.date));
    }

    setSelectGames(SelectGames);    

  }, [dto,dto.sortingOptions.getSortingOptions, groups, setSelectGames, showDefault]);

  const memoizedImages = useMemo(() => {
    // Пересчет количества игр
    return (
      <GameGallery getSelectGames={getSelectGames} columns={dto.Row.getRow} />
    );
  }, [getSelectGames, dto.Row.getRow]); // Зависимости для пересчета useMemo

  return (
    <section className="games" style={{ maxWidth: `100%` }}>
      {memoizedImages}
    </section>
  );
};

GameList.propTypes = {
  List: PropTypes.object.isRequired,
  GameListContext: PropTypes.object.isRequired,
};

export default GameList;
