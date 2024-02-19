import React, { useMemo, useContext, useEffect, useState, useRef } from 'react';
import './GameList.css';

const GameList = ({ List, GameListContext }) => {
    const [getSelectGames, setSelectGames] = useState([]);
    const { games, groups, providers } = List;
    const defaultGames = useRef();
    const dto = useContext(GameListContext)
    const ClassNameMap = {
        '4': "game-thumbnail-small",
        '3': "game-thumbnail-medium",
        '2': "game-thumbnail-medium"
    }

    const showDefault = () => {
        let GameId = [];
        // Перебираем выбранные группы и извлекаем из них игры
        groups.forEach((element) => {
            GameId = [...GameId, ...element.games];
        });
        defaultGames.current = games.filter(game => GameId.includes(game.id));
        console.count('showDefault');
        console.log(defaultGames.current);
        setSelectGames(defaultGames.current);
    }



    useEffect(() => {
        console.countReset('Mount GameList');
        console.countReset('showDefault');
        console.count('Mount GameList');
    }, [])

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
            const group = groups.find(e => e.id === id);
            if (group && group.games.length > 0) {
                GameId = [...GameId, ...group.games];
            }
        });

        // Создание массива для выбранных игр
        let SelectGames = [];

        // Фильтруем игры по id, полученным из выбранных групп

        // Если ничего не выбрано
        if (GameId.length === 0 && providerId.length === 0) {
            console.log('Нечего не выбранно');
            showDefault();
            return; // Ранний выход, если ничего не выбрано
        }



        // Если выбраны оба фильтра
        if (GameId.length > 0 && providerId.length > 0) {
            SelectGames = defaultGames.current.filter(game =>
                GameId.includes(game.id) && providerId.includes(game.provider)
            );
        }
        // Если выбран только один фильтр: GameId
        else if (GameId.length > 0) {
            SelectGames = defaultGames.current.filter(game =>
                GameId.includes(game.id)
            );
        }
        // Если выбран только один фильтр: providerId
        else if (providerId.length > 0) {
            SelectGames = defaultGames.current.filter(game =>
                providerId.includes(game.provider)
            );
        }

        

        const sortfunc = (a, b) => {
            if (a < b) {
              return -1;
            }
            if (a > b) {
              return 1;
            }
            // a должно быть равным b
            return 0;
          }

        const searchBySubstring = (list,substring) => {
            return list.filter(item => item.name.toLowerCase().includes(substring.toLowerCase()));
        };

        if(dto.sortingOptions.getSortingOptions.includes('A-Z')){
            console.log('A-Z')
            SelectGames = SelectGames.sort((a, b) => sortfunc(a.name, b.name));
            console.log('A-Z ',SelectGames)
        }

        if(dto.sortingOptions.getSortingOptions.includes('Z-A')){
            console.log('Z-A')
            SelectGames = SelectGames.sort((a, b) => sortfunc(b.name, a.name));
            console.log('Z-A ',SelectGames)
        }

        if(dto.sortingOptions.getSortingOptions.includes('Newest')){
            console.log('Newest')
            SelectGames = SelectGames.sort((a, b) => sortfunc(a.date,b.date));
            console.log('Newest ',SelectGames)
        }

        if(dto.Search.getSearch!==''){
            console.log('Search',dto.Search.getSearch)
            SelectGames = searchBySubstring(SelectGames,dto.Search.getSearch);
            console.log('Search ',SelectGames)
        }



        console.log('Выбранные игры:', SelectGames);
        setSelectGames(SelectGames);


    }, [dto])

    const memoizedImages = useMemo(() => {
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
        <section className="games" style={
            { maxWidth: `calc(100%/${4 - dto.Row.getRow})` }
        }>
            {memoizedImages}
        </section>
    )
};

export default GameList;