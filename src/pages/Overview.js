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
    const url = `https://api.rawg.io/api/games?key=${_key}&page_size=21`;
    const yellow = '#ffc82c';
    let favFilterOn;

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
        favFilterOn = false;
        let value = event.target.value.toLowerCase();
        let result = [];
        result = results.filter((data) => {
            return data.name.toLowerCase().search(value) != -1;
        });
        setDuplicate(result);
    }

    const filterFavorites = (favs) => {
        if (duplicateResults == results) {
            favFilterOn = true;
            let result = [];
            let array = favorites;
            let inter = result.filter(x => array.includes(x));
            results.map((res) => {
                if (array.includes(res.id)) {
                    result.push(res);
                }
            });
            setDuplicate(result);

        } else {
            favFilterOn = false;
            setDuplicate(results);
        }



    }

    const addFavorite = (game) => {

        let array = favorites;
        let addArray = true;
        if (array != null) {
            array.map((item, key) => {
                if (item === game.id) {
                    array.splice(key, 1);
                    addArray = false;
                }
            });
        }

        if (addArray) {
            array.push(game.id);
        }
        setFavorites([...array]);
        localStorage.setItem("favorites", JSON.stringify(favorites));

    };
    return (
        <div>
            <div className="header-section ">
                <div className="flex items-center justify-center mb-10 header-overview">
                    <div className="basis-1/5">
                        <div className="flex flex-row ml-5 mt-5">
                            <a href="https://barco.com"><img src={logo} alt="barcologo" className="header-logo" /></a>
                        </div>
                    </div>
                    <div className="basis-1/5"></div>
                    <div className="basis-1/5">
                        <div className="flex flex-row mt-5">
                            {(duplicateResults != results) ? <StarIcon onClick={() => filterFavorites({ favorites })} className="h-6 w-6 mr-5 mt-2" color={yellow} fill={yellow} /> :
                                <StarIcon onClick={() => filterFavorites({ favorites })} className="h-6 w-6 mr-5 mt-2" color={yellow} />
                            }

                            <div class="flex search-bar">
                                <input type="text" onChange={(event) => handleSearch(event)} class="px-6 py-2 search-bar" placeholder="Search..." />
                            </div>
                        </div>
                    </div>
                    <div className="basis-1/5"></div>
                    <div className="basis-1/5"></div>
                </div>
            </div>
            <div className="container mx-auto mt-10 mb-20 ">
                <div className="content-section flex justify-center ">
                    <div className="flex flex-wrap justify-center">
                        {duplicateResults.map((game, i) => (
                            <div className="basis-1/4 ml-5 mr-5 mb-5 mt-5 flex " >
                                <div key={game.id} className="game-card" style={{ backgroundImage: `url(${game.background_image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}   >
                                    <div className="game-card-content relative ">
                                        <div className="flex flex-col h-full justify-between">
                                            <div className="flex flex-col h-full ">
                                                <div className="flex flex-row pl-3 pt-3 justify-between">
                                                    <div>
                                                        <p key={game.id} className="text-white font-bold text-lg">{game.name}</p>
                                                    </div>
                                                    <div>
                                                        {favorites.includes(game.id) ? (
                                                            <StarIcon onClick={() => addFavorite(game)} className="h-5 w-5 mr-5 mt-1 " color={yellow} fill={yellow} />

                                                        ) : <StarIcon onClick={() => addFavorite(game)} className="h-5 w-5 mr-5 mt-1 " color={yellow} />
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
                                                <div className="flex mt-10 transition ease-in-out delay-250 flex-row pl-3 pt-3 pb-1 h-full text-white hover:opacity-100 opacity-0 ">
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
                </div>

            </div >
            <div className="footer-section">
                <div className="flex flex-row justify-center mb-5">
                    <p>Project made for <a href="https://barco.com"><span className="text-barcored">Barco</span></a> by Alexander Deprez</p>
                </div>
            </div>

        </div>


    );
}


export default Overview;
