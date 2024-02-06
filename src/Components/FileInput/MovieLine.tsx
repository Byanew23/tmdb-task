import React from 'react'
import './movieLine.css'

interface MovieLineType {
    movie: string,
    selected: boolean,
    checkMovie: () => void
}
export const MovieLine = (
    { movie, selected, checkMovie }: MovieLineType
) => {
    return (<div className="movie-line" key={movie}>
        <input type='checkbox' checked={selected} onChange={checkMovie}></input>
        <h3>{movie}</h3>
    </div>)
}