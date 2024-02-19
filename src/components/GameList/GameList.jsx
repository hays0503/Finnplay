import React, { memo, useContext, useEffect } from 'react';
import './GameList.css';

const GameList = ({ List, GameListContext }) => {
    const { games, groups, providers } = List;
    const dto = useContext(GameListContext)
    const ClassNameMap={
        '4':"game-thumbnail-small",
        '3':"game-thumbnail-medium",
        '2':"game-thumbnail-medium"
    }

    // useEffect(()=>{
    //     console.log("Dto obj ",dto)
    //     console.log("dto.Group.getGroup ",dto.Group.getGroup)
    // },[dto])

    const selectId = [1,2,3,4];
    let GameId = [];
    selectId.forEach((id) => {
        // Находим группу по id и извлекаем из неё игры
        const group = groups.find(e => e.id === id);
        if (group && group.games.length > 0) {
            GameId = [...GameId, ...group.games];
        }
    });


    // Фильтруем игры по id, полученным из выбранных групп
    const SelectGames = games.filter(game => GameId.includes(game.id));

    return (
        //row = 2  calc(100%/3) 5-2
        //row = 3  calc(100%/2) 5-3
        //row = 4  calc(100%/1) 5-4
        <section className="games" style={
            { maxWidth: `calc(100%/${4-dto.Row.getRow})` }
            }>
            {SelectGames.map((element) => (
                <img
                    key={element.id}
                    className={ClassNameMap[dto.Row.getRow]}
                    loading="eager"
                    alt={element.name}
                    src={element.coverLarge}
                />
            ))}
        </section>
    )
};

export default GameList;