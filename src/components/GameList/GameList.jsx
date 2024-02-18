import React, { memo, useContext } from 'react';
import './GameList.css';

const GameList = ({ List, GameListContext }) => {
    const { games, groups, providers } = List;
    const dto = useContext(GameListContext)
    console.log(dto.Row.getRow)
    return (
        //row = 2 calc(100%/3) 5-2
        //row = 3  calc(100%/2) 5-3
        //row = 4  calc(100%/1) 5-4
        <section className="games" style={
            { maxWidth: `calc(100%/${5-dto.Row.getRow})` }
            }>
            {games.map((element) => (
                <img
                    key={element.id}
                    className="game-thumbnail"
                    loading="eager"
                    alt={element.name}
                    src={element.cover}
                />
            ))}
        </section>
    )
};

export default GameList;