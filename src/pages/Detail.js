import React, { Component } from 'react';
import logo from '../assets/images/barco-logo.png';
import '../App.css';
import { StarIcon } from '@heroicons/react/outline';
import { UserIcon } from '@heroicons/react/outline';

class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            games: [],
            count: 0,
        }
    }
    componentDidMount() {
        const _key = "f7ff1c8a88da4cccb4d44c21de02f1a8";
        const url = `https://api.rawg.io/api/games?key=${_key}`;

        fetch(url)
            .then(res => res.json())
            .then(res => this.setState({ games: res.results }))
    }

    render() {
        const yellow = '#ffc82c';

        const { games } = this.state;
        return (
            <div className="container mx-auto">
                <div className="flex mt-10 flex-row bg-gray-light header-bar">
                    <div className="basis-1/4">
                        <div className="flex  items-center">
                            <img className="barco-logo" src={logo} alt="logo barco"></img>
                        </div>
                    </div>
                    <div className="basis-1/4">
                        <div className="flex  items-center">
                            <h2 className="font-museo-sans text-xl text-white font-black">Game librassssssry</h2>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap">
                    {games.map((game) => (
                        <div className="basis-1/3 mb-5 mt-5 flex justify-center" >
                            <div key={game.id} className="game-card" style={{ backgroundImage: `url(${game.background_image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}   >
                                <div className="game-card-content relative ">
                                    <div className="flex flex-col h-full justify-between">
                                        <div className="flex flex-col h-full ">
                                            <div className="flex flex-row pl-3 pt-3 justify-between">
                                                <div>
                                                    <p className="text-white font-bold text-lg">{game.name}</p>
                                                </div>
                                                <div>
                                                    <StarIcon className="h-5 w-5 mr-5 mt-1 " color={yellow} />
                                                </div>
                                            </div>
                                            <div className="flex flex-row pl-3 pt-3">
                                                <div>
                                                    <UserIcon className="h-5 w-5 mr-5 mt-1 " color='white' />
                                                </div>
                                                <div>
                                                    <p className="text-white font-bold text-lg">{game.rating} / 5</p>
                                                </div>
                                            </div>
                                            <div className="flex transition ease-in-out delay-250 flex-row pl-3 pt-3 pb-1 h-full text-white hover:opacity-100 opacity-0 ">
                                                <div className="absolute">
                                                    <p className="font-bold text-lg ">Potential game review by a known scource -Barco, 2022</p>                      </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row pl-3 pt-3 pb-1">
                                            <div>
                                                <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-md font-bold text-white bg-none rounded-lg border-2 border-white hover:bg-whiteopa">View Game</button>
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

}

export default Detail;
