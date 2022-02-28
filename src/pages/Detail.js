
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
    const [publishers, setPublishers] = React.useState(Array);
    const [genres, setGenres] = React.useState(null);
    const [screenshots, setScreenshots] = React.useState(Array);
    const [loading, setLoading] = React.useState(null);
    const [favorites, setFavorites] = React.useState(Array);
    const [duplicateResults, setDuplicate] = React.useState(game);
    const [reviews, setReviews] = React.useState(Array);
    const [reviewName, setReviewName] = React.useState(null);
    const [reviewEmail, setReviewEmail] = React.useState(null);
    const [reviewRating, setReviewRating] = React.useState(0);
    const [reviewText, setReviewText] = React.useState(null);
    const [reviewBool, setReviewBool] = React.useState(null);
    const getArray = JSON.parse(localStorage.getItem('favorites') || '0')
    const getReviews = JSON.parse(localStorage.getItem(id));
    const yellow = '#ffc82c';
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
    const handleSubmit = (e) => {

        let prevReview = JSON.parse(localStorage.getItem(id));
        const review = [reviewName, reviewEmail, reviewText, reviewRating];
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
                                        {favorites.includes(parseInt(id)) ? (
                                            <StarIcon onClick={() => addFavorite(game)} className="h-5 w-5 mr-5 mt-1 " color={yellow} fill={yellow} />

                                        ) : <StarIcon onClick={() => addFavorite(game)} className="h-5 w-5 mr-5 mt-1 " color={yellow} />
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
                            <div className="">
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
                            <div className="">
                                {description}
                            </div>
                        </div>
                        <div className="flex basis-1/4">
                            <div className="info-panel w-full p-5 bg-gray-light2 ">
                                <div className="flex flex-col">
                                    <div className="mb-3">
                                        <p className="font-bold">Release date:</p>

                                    </div>
                                    <div className="mb-3">
                                        <p> {releaseDate}</p>
                                    </div>
                                    <div className="flex flex-row mb-3">
                                        <p className="font-bold">Published by:</p>
                                    </div>

                                    {
                                        publishers.map((publisher) => (
                                            <div className="flex flex-row mb-3">
                                                <p>{publisher.name}</p>
                                            </div>
                                        ))
                                    }


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="screenshot-section">
                    <div className="flex flex-wrap justify-right">
                        {screenshots.map((screenshot, i) => (
                            <div className="basis-1/3 justify-around flex">
                                <div className="screenshot-container mb-5">
                                    <img className="screenshot" key={i} src={screenshot.image} alt={`screenshot ${i + 1}`} />
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
                <div className="review-section">
                    <div className="flex flex-row">
                        <div className="basis-1/4">
                            <div className="flex flex-col">
                                <div className="review-title">
                                    <h2 className="font-sans">Leave a <span className="text-barcored">review</span></h2>
                                </div>
                                <form onSubmit={e => { handleSubmit(e) }}>

                                    <div className="mb-4">
                                        <label className="block  text-gray-700 text-md font-bold mb-2" htmlFor="name">Name</label>
                                        <input type="text" name="name" className="border p-3 textfield" value={reviewName} onChange={e => setReviewName(e.target.value)} />

                                    </div>
                                    <div className="mb-6">
                                        <label className="block  text-gray-700 text-md font-bold mb-2" htmlFor="email">Email</label>
                                        <input className="border p-3 textfield" name="email" type="text" value={reviewEmail} onChange={e => setReviewEmail(e.target.value)} />

                                    </div>
                                    <div>
                                        <label className="block  text-gray-700 text-md font-bold mb-2" htmlFor="email">Your rating</label>
                                        <div className="rate mb-3">
                                            <input type="radio" id="star5" name="rate" value="5" onChange={e => setReviewRating(e.target.value)} />
                                            <label for="star5" title="text">5 stars</label>
                                            <input type="radio" id="star4" name="rate" value="4" onChange={e => setReviewRating(e.target.value)} />
                                            <label for="star4" title="text">4 stars</label>
                                            <input type="radio" id="star3" name="rate" value="3" onChange={e => setReviewRating(e.target.value)} />
                                            <label for="star3" title="text">3 stars</label>
                                            <input type="radio" id="star2" name="rate" value="2" onChange={e => setReviewRating(e.target.value)} />
                                            <label for="star2" title="text">2 stars</label>
                                            <input type="radio" id="star1" name="rate" value="1" onChange={e => setReviewRating(e.target.value)} />
                                            <label for="star1" title="text">1 star</label>
                                        </div>
                                    </div>
                                    <div>
                                        <textarea name="review" placeholder="Your review..." className="border p-3 border-black block text-gray-700 text-sm font-bold mb-2" id="review" value={reviewText} cols="30" rows="10" onChange={e => setReviewText(e.target.value)} ></textarea>

                                    </div>


                                    <button className="py-2.5 mt-4 textfield px-5 mr-2 mb-2 text-md font-bold text-black bg-none  border-2 border-black hover:bg-blackopa" type="submit">Send review</button>
                                </form>
                            </div>
                        </div>
                        <div>
                            {

                                <div className="flex flex-wrap ml-10">
                                    {reviews.map((review, i) => (
                                        <div className="flex ml-5 mr-5 basis-3/4">
                                            <div className="review-card pl-5 pt-10 pb-5">
                                                <div className="flex flex-col">
                                                    <div className="flex flex-col">
                                                        <h4 className="review-name">{review[0]}</h4>
                                                        <p className="review-email mb-1">{review[1]}</p>
                                                        {review[3] != 0 ?
                                                            <div className="flex flex-row mb-2">
                                                                <p>{review[3]}x </p>
                                                                <StarIcon className="h-5 w-5 ml-1" color={yellow} fill={yellow} />
                                                            </div> : <div></div>

                                                        }
                                                        {/* {_.times(review[3], (i) => (
                                                            <StarIcon className="h-5 w-5 ml-1" color={yellow} fill={yellow} />
                                                        ))} */}
                                                    </div>
                                                    <p className="review-text">{review[2]}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))} </div>



                            }
                        </div>

                    </div>

                </div>

            </div >
        </div>

    );
}


export default Detail;
