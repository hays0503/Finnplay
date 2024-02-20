import { useEffect, useState, createContext } from "react";
import Header from "@components/Header/Header";
import GameList from "@components/GameList/GameList";
import Filters from "@components/Filters/Filters";
import "./UserGameList.css";

// создаем контекст для передачи данных между компонентами
const GameListContext = createContext();

/**
 * UserGameList component.
 * Renders a list of games and filters for the user.
 *
 * @component
 * @returns {JSX.Element} UserGameList component
 */
const UserGameList = () => {
  const [objUserGameList, SetObjUserGameList] = useState();

  const [getRow, setRow] = useState(4);

  const [getGroup, setGroup] = useState([]);

  const [getProvider, setProvider] = useState([]);

  const [getSortingOptions, setSortingOptions] = useState([]);

  const [getSearch, setSearch] = useState("");

  const [getGamesAmount, setGamesAmount] = useState(0);

  //Объект для передачи данных между компонентами
  const dto = {
    GamesAmount:{
      getGamesAmount,
      setGamesAmount
    },
    Row: {
      getRow,
      setRow,
    },
    Group: {
      getGroup,
      setGroup,
    },
    Provider: {
      getProvider,
      setProvider,
    },
    sortingOptions: {
      getSortingOptions,
      setSortingOptions,
    },
    Search: {
      getSearch,
      setSearch,
    },
  };

  //Получаем список игр
  const getGameList = async () => {
    //localhost:3000/listgame
    const response = await fetch("http://127.0.0.1:3000/listgame", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.json();
  };

  //Загружаем список и игр
  useEffect(() => {
    getGameList()
      .then((data) => {
        //Проверяем аутентификацию
        if (!data.auth) {
          localStorage.clear();
          // throw new Error("Ошибка аутентификации или сессия истекла авторизуйтесь");
        }
        //Устанавливаем список игр
        SetObjUserGameList(data.gamelist);
      })
      .catch((e) => {
        alert(e);
        console.log(e);
      });
  }, []);

  return (
    <GameListContext.Provider value={dto}>
      <div className="usergame-list">
        {/* Заголовок */}
        <Header />
        <main className="filters-frame">
          {/* Блок фильтров */}
          {objUserGameList && (
            <Filters GameListContext={GameListContext} List={objUserGameList} />
          )}
          {/* Блок списка игр */}
          {objUserGameList && (
            <GameList
              List={objUserGameList}
              GameListContext={GameListContext}
            />
          )}

        </main>
      </div>
    </GameListContext.Provider>
  );
};

export default UserGameList;
