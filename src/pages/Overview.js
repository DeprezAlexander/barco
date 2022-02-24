import React, { Component, useState } from 'react';
import logo from '../assets/images/barco-logo.png';
import '../App.css';
import { StarIcon } from '@heroicons/react/outline';
import { UserIcon } from '@heroicons/react/outline';
import { Link } from "react-router-dom";


function Overview() {
    const [results, setResults] = React.useState(Array);
    const [favorites, setFavorites] = useState(Array);
    const [duplicateResults, setDuplicate] = React.useState(results);
    const getArray = JSON.parse(localStorage.getItem('favorites') || '0')
    const _key = "f7ff1c8a88da4cccb4d44c21de02f1a8";
    const url = `https://api.rawg.io/api/games?key=${_key}`;
    const yellow = '#ffc82c';

    React.useEffect(() => {
        if (getArray !== 0) {
            setFavorites([...getArray])
        }
        fetch(url)
            .then(res => res.json())
            .then(res => {
                setResults(res.results);
                setDuplicate(res.results);
            });
    }, []);

    const handleSearch = (event) => {
        let value = event.target.value.toLowerCase();
        let result = [];
        result = results.filter((data) => {
            return data.name.toLowerCase().search(value) != -1;
        });
        setDuplicate(result);
    }

    const addFavorite = (game) => {

        let array = favorites;
        let addArray = true;
        array.map((item, key) => {
            if (item === game.i) {
                array.splice(key, 1);
                addArray = false;
            }
        });
        if (addArray) {
            array.push(game.i);
        }
        setFavorites([...array]);
        localStorage.setItem("favorites", JSON.stringify(favorites));

        var storage = localStorage.getItem('favItem' + (game.i) || '0')
        if (storage == null) {
            localStorage.setItem(('favItem' + (game.i)), JSON.stringify(game));
        } else {
            localStorage.removeItem('favItem' + (game.i));
        }
    };
    return (
        <div className="container mx-auto mt-10 mb-10 ">
            <div class="flex items-center justify-center mb-10 ">
                <StarIcon className="h-6 w-6 mr-5 mt-1" color="black" />
                <UserIcon className="h-6 w-6 mr-5 mt-1" color="black" />
                <div class="flex border-2 border-gray-200 rounded">
                    <input type="text" onChange={(event) => handleSearch(event)} class="px-4 py-2 w-80" placeholder="Search..." />
                </div>
            </div>
            <div className="flex flex-wrap justify-center">
                {duplicateResults.map((game, i) => (
                    <div className="basis-1/4 ml-5 mr-5 mb-5 mt-5 flex justify-center" >
                        <div key={game.id} className="game-card" style={{ backgroundImage: `url(${game.background_image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}   >
                            <div className="game-card-content relative ">
                                <div className="flex flex-col h-full justify-between">
                                    <div className="flex flex-col h-full ">
                                        <div className="flex flex-row pl-3 pt-3 justify-between">
                                            <div>
                                                <p key={game.id} className="text-white font-bold text-lg">{game.name}</p>
                                            </div>
                                            <div>
                                                {favorites.includes(i) ? (
                                                    <StarIcon onClick={() => addFavorite({ game, i })} className="h-5 w-5 mr-5 mt-1 " color={yellow} fill={yellow} />

                                                ) : <StarIcon onClick={() => addFavorite({ game, i })} className="h-5 w-5 mr-5 mt-1 " color={yellow} />
                                                }
                                            </div>
                                        </div>
                                        <div className="flex flex-row pl-3 pt-3">
                                            <div>
                                                <UserIcon className="h-5 w-5 mr-5 mt-1 " color='white' />
                                            </div>
                                            <div>
                                                <p key={game.id} className="text-white font-bold text-lg">{game.rating} / 5</p>
                                            </div>
                                        </div>
                                        <div className="flex transition ease-in-out delay-250 flex-row pl-3 pt-3 pb-1 h-full text-white hover:opacity-100 opacity-0 ">
                                            <div className="absolute">
                                                <p className="font-bold text-lg ">Potential game review by a known scource -Barco, 2022</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row pl-3 pt-3 pb-1">
                                        <div>
                                            <Link to={`/detail/${game.id}/${i}`} key={game.id}><button type="button" className="py-2.5 px-5 mr-2 mb-2 text-md font-bold text-white bg-none rounded-lg border-2 border-white hover:bg-whiteopa" >View Game</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}


export default Overview;
