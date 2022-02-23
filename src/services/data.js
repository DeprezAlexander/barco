import { Game } from "../game";
export function getGame(number) {

    const _key = "f7ff1c8a88da4cccb4d44c21de02f1a8";
    const url = `https://api.rawg.io/api/games/${number}?key=${_key}`;
    return fetch(url)
        .then(res => res.json())
        .then(res => this.setState({ game: res.results }))


}

