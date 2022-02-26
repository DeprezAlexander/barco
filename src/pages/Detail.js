
import React from 'react';
import reddit from '../assets/images/reddit.png';
import '../App.css';
import { StarIcon } from '@heroicons/react/outline';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import { GlobeAltIcon } from '@heroicons/react/outline';
import { Link } from "react-router-dom";
import logo from '../assets/images/barco-logo.png';

import { useParams } from 'react-router-dom'

function Detail() {
    const { id } = useParams();
    const { pos } = useParams();
    const [name, setName] = React.useState(null);
    const [game, setResults] = React.useState(null);
    const [description, setDescription] = React.useState(null);
    const [releaseDate, setReleaseDate] = React.useState(null);
    const [backgroundImage, setBackgroundImage] = React.useState(null);
    const [website, setWebsite] = React.useState(null);
    const [subreddit, setSubreddit] = React.useState(null);
    const [subredditName, setSubredditName] = React.useState(null);
    const [publishers, setPublishers] = React.useState(null);
    const [genres, setGenres] = React.useState(null);
    const [screenshots, setScreenshots] = React.useState(null);
    const [loading, setLoading] = React.useState(null);
    const [favorites, setFavorites] = React.useState(Array);
    const [duplicateResults, setDuplicate] = React.useState(game);
    const [reviews, setReviews] = React.useState(Array);
    const [reviewName, setReviewName] = React.useState(null);
    const [reviewEmail, setReviewEmail] = React.useState(null);
    const [reviewText, setReviewText] = React.useState(null);
    const [reviewBool, setReviewBool] = React.useState(null);
    const getArray = JSON.parse(localStorage.getItem('favorites') || '0')
    const getReviews = JSON.parse(localStorage.getItem(id));
    const yellow = '#ffc82c';
    const reviesAvailable = false;
    const _key = "f7ff1c8a88da4cccb4d44c21de02f1a8";
    const detailUrl = `https://api.rawg.io/api/games/${id}?key=${_key}`;
    const screenshotUrl = `https://api.rawg.io/api/games/${id}/screenshots?key=${_key}`

    React.useEffect(() => {
        console.log(getArray);
        if (getArray !== 0) {
            setFavorites([...getArray])
        }
        if (getReviews !== null) {
            setReviews(getReviews);
            setReviewBool(true);
        }

        fetch(detailUrl)
            .then(res => res.json())
            .then(res => {
                setResults(res);
                setDuplicate(res);
                setName(res.name);
                setDescription(res.description_raw);
                setReleaseDate(res.released);
                setBackgroundImage(res.background_image);
                setWebsite(res.website);
                setSubreddit(res.reddit_url);
                setSubredditName(res.reddit_name);
                setPublishers(res.publishers);
                setGenres(res.genres);
                setLoading(false);
            });
    }, []);
    React.useEffect(() => {
        fetch(screenshotUrl)
            .then(res => res.json())
            .then(res => {
                setScreenshots(res.results);
            });
    }, []);
    const addFavorite = (game) => {

        let array = favorites;
        let addArray = true;
        array.map((item, key) => {
            if (item === parseInt(game.pos)) {
                array.splice(key, 1);
                addArray = false;
            }
        });
        if (addArray) {
            array.push(parseInt(game.pos));
        }
        setFavorites([...array]);
        localStorage.setItem("favorites", JSON.stringify(favorites));

        var storage = localStorage.getItem('favItem' + (game.pos) || '0')
        if (storage == null) {
            localStorage.setItem(('favItem' + (game.pos)), JSON.stringify(game));
        } else {
            localStorage.removeItem('favItem' + (game.pos));
        }
    };
    //add array to local storage with
    const handleSubmit = (e) => {
        let prevReview = JSON.parse(localStorage.getItem(id));
        const review = [reviewName, reviewEmail, reviewText];
        const init = [review];
        if (prevReview != null) {
            const newReview = [];
            prevReview.map((r) => {
                newReview.push(r);
            })
            newReview.push(review);
            localStorage.setItem(id, JSON.stringify(newReview));
        } else {
            localStorage.setItem(id, JSON.stringify(init))
        }
    }

    return (
        <div>
            <div className="header-section">
                <div className="flex items-center  justify-center mb-10 header-overview">
                    <div className="basis-1/5">
                        <div className="flex flex-row ml-5 mt-5">
                            <img src={logo} alt="barcologo" className="header-logo" />
                        </div>
                    </div>
                    <div className="basis-1/5"></div>
                    <div className="basis-1/5"></div>
                    <div className="basis-1/5"></div>
                    <div className="basis-1/5"></div>
                </div>
            </div>
            <div className="container mt-10 mb-10 mx-auto">
                <div className="header-section">
                    <div className="image-banner" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'top-center', backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
                        <div className="image-banner-overlay">
                            <div className="flex flex-col h-full justify-between ">
                                <div className="flex flex-row justify-between">
                                    <div className="mt-5 ml-10 flex ">
                                        <Link to={`/`}> <ArrowLeftIcon className="h-10 w-10" color="#fff" /></Link>
                                    </div>
                                    <div className="mt-5 mr-8 flex ">
                                        {favorites.includes(parseInt(pos)) ? (
                                            <StarIcon onClick={() => addFavorite({ game, pos })} className="h-7 w-7 mr-5 mt-1 " color={yellow} fill={yellow} />

                                        ) : <StarIcon onClick={() => addFavorite({ game, pos })} className="h-7 w-7 mr-5 mt-1 " color={yellow} />
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="mb-5 ml-10 flex ">
                                        <h2 className="text-white font-bold detail-title">{name}</h2>
                                    </div>
                                    <div className="mb-5 ml-3 flex flex-row content-end">
                                        <h3 className="font-bold genre-title mr-2">{(genres != null) ? genres[0].name : ""}</h3>
                                        <h3 className="font-bold genre-title">{(genres != null) ? genres[1].name : ""}</h3>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="detail-section">
                    <div className="flex flex-row mt-20 mb-10 justify-between">
                        <div className="flex basis-1/7">
                            <div className="ml-10">
                                <div className="flex flex-row mb-3">
                                    <img src={reddit} className="h-7 mr-3" alt="reddit" />
                                    <a href={subreddit}>{subredditName}</a>
                                </div>
                                <div className="flex flex-row mb-3">
                                    <GlobeAltIcon className="h-7 w-7 mr-3" color="#000" />
                                    <a href={website}>Website</a>
                                </div>
                            </div>
                        </div>
                        <div className="flex basis-2/5">
                            <div className="ml-10">
                                {description}
                            </div>
                        </div>
                        <div className="flex basis-1/3">
                            <div className="info-panel w-full p-5 bg-gray-light2 mr-10">
                                <div className="flex flex-col">
                                    <div className="mb-3">
                                        <p>Release date: {releaseDate}</p>
                                    </div>

                                    <div className="flex flex-row mb-3">
                                        <p>Published by:</p>
                                    </div>

                                    {/* {
                                    publishers.map((publisher) => (
                                        <div className="flex flex-row mb-3">
                                            <p>{publisher.name}</p>
                                        </div>
                                    ))
                                } */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="review-section">
                    <div className="flex">
                        <form onSubmit={e => { handleSubmit(e) }}>
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" className="border" value={reviewName} onChange={e => setReviewName(e.target.value)} />
                            <label htmlFor="email">Email</label>
                            <input className="border" name="email" type="text" value={reviewEmail} onChange={e => setReviewEmail(e.target.value)} />
                            <label htmlFor="review">Your opinion</label>
                            <textarea name="review" className="border" id="review" value={reviewText} cols="30" rows="10" onChange={e => setReviewText(e.target.value)} ></textarea>
                            <button type="submit">Send</button>
                        </form>
                    </div>
                </div>
                <div>
                    {
                        reviewBool ? (

                            <div className="flex flex-wrap mt-20">
                                {reviews.map((review, i) => (
                                    <div className="flex basis-1/4">
                                        <div className="review-card pl-5 pt-5 pb-5">
                                            <div className="flex flex-col">
                                                <div className="flex flex-col">
                                                    <h4>{review[0]}</h4>
                                                    <p>{review[1]}</p>
                                                </div>
                                                <p>{review[2]}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))} </div>

                        )
                            : (
                                <p>No reviews yet.</p>
                            )
                    }
                </div>
            </div >
        </div>

    );
}


export default Detail;
