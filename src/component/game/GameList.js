import React from 'react';
import {Link} from "react-router-dom";

const GameList = ({games}) => {
    return (
        <div className="game-element">
            {games && games.map(game => {
                return (
                    <Link to={"/game/" + game.id} key={game.id}>
                        <div className="game-item">
                            <div className="title"> {game.title} </div>
                            <div className="create-date"> {game.created.toDate().toLocaleDateString()}</div>
                            <div className="author"> {game.authorNick}</div>
                            <div className="num-of-user">
                                <i className="far fa-user-circle"/>
                                <i className="far fa-user-circle"/>
                                <i className="far fa-user-circle"/>
                                <p className="num-of-user-more"> +5</p>
                            </div>
                            <div className="num-of-post"> 16</div>
                            <div className="num-of-event"> 4</div>
                        </div>
                    </Link>)
            })}
        </div>
    );
};

export default GameList;
