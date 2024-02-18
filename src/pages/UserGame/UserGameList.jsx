import React, { useEffect, useState, createContext } from "react";
import Header from "@components/Header/Header";
import GameList from "@components/GameList/GameList";
import Filters from "@components/Filters/Filters";
import "./UserGameList.css";

// создаем контекст для передачи данных между компонентами
const GameListContext = createContext();

const UserGameList = () => {

  const [objUserGameList, SetObjUserGameList] = useState();

  const [getRow, setRow] = useState(4);



  //Объект для передачи данных между компонентами
  const dto = {
    Row:{
      getRow,
      setRow
    }
  }


  //Получаем список игр
  const getGameList = async () => {
    //localhost:3000/listgame
    const response = await fetch('http://127.0.0.1:3000/listgame', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    return response.json();
  };

  //Загружаем список и игр
  useEffect(() => {
    getGameList().then((data) => {
      //Проверяем аутентификацию
      if (!data.auth) {
        throw new Error('Ошибка аутентификации');
      }
      //Устанавливаем список игр
      console.log("USE EFFECT",data);
      SetObjUserGameList(data.gamelist);
    }).catch((e) => {
      alert(e);
      console.log(e);
    })
  }, []);

  return (
    <GameListContext.Provider value={dto}>
      <div className="usergame-list">
        {/* Заголовок */}
        <Header />
        <main className="filters-frame">
          {/* Блок списка игр */}
          {objUserGameList && <GameList List={objUserGameList} GameListContext={GameListContext} />}
        {/* Блок фильтров */}
          {objUserGameList && <Filters GameListContext={GameListContext} List={objUserGameList}/>}
        </main>
      </div>
    </GameListContext.Provider>
  );
};

export default UserGameList;
