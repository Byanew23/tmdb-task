import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FetchedMovieType, useFetchMovies } from '../../hooks'
import { genresMap } from '../utils';
import { SearchBar } from './SearchBar';
import { Filter } from './Filter'
import './moviesList.css'

export const MoviesList = (
    {
        movies,
        savedMovies,
        setSavedMovies,
        language
    }: {
        movies: string[],
        savedMovies: FetchedMovieType[],
        setSavedMovies: React.Dispatch<React.SetStateAction<FetchedMovieType[]>>,
        language: string
    }) => {
    const [selectedFilters, setSelectedFilters] = React.useState<string[]>([])
    const [filteredMovies, setFilteredMovies] = React.useState<FetchedMovieType[]>([])

    const { movies: fetchedMovies, loading } = useFetchMovies({ selectedMovies: movies, language })


    const handleDelete = (id: string) => {
        const tempMovies = [...(savedMovies.length ? savedMovies : fetchedMovies)]

        setSavedMovies(tempMovies.filter(mov => mov.id !== id))
    }

    const handleAddMovie = (movie: FetchedMovieType) => {
        const tempMovies = [...(savedMovies.length ? savedMovies : fetchedMovies), movie]
        setSavedMovies(tempMovies)
    }

    const filterMoviesByGenres = (movies: FetchedMovieType[], filters: string[]): FetchedMovieType[] => {
        return movies.filter(movie => {
            const movieGenres = movie.genres.split(',').map(genre => genre.trim());
            return filters.some(filter => movieGenres.includes(filter));
        });
    }

    React.useEffect(() => {
        const filteredMovies = filterMoviesByGenres((savedMovies.length ? savedMovies : fetchedMovies), selectedFilters);
        setFilteredMovies(filteredMovies)
    }, [selectedFilters, savedMovies])



    if (loading) {
        return <h2>Loading...</h2>
    }

    return <div>
        <div className='top-nav'>

            <SearchBar language={language} addMovie={handleAddMovie} />
            <Filter movies={(savedMovies.length ? savedMovies : fetchedMovies)} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
        </div>
        {
            selectedFilters.length ? filteredMovies.map((movie, index) => {
                return <span key={`${index}__${movie.title}`} className='movie-entry'>
                    <img src={movie.poster_url} className='poster' alt={movie.title} />
                    <span className='details'>
                        <p className='title'>{movie.title}</p>
                        <p className='release-date'>Release Date: {movie.release_date}</p>
                        <p className='overview'>{movie.overview}</p>
                        <p>Genres: {movie.genres.split(', ').map(id => genresMap[parseInt(id)]).join(', ')}</p>
                        <p>Rating: <b>{movie.rating}</b></p>
                        <FontAwesomeIcon icon={faTrash} className='thrash-icon' onClick={() => handleDelete(movie.id)} />
                    </span>
                </span>
            }) :

                (savedMovies.length ? savedMovies : fetchedMovies).map((movie, index) => {
                    return <span key={`${index}__${movie.title}`} className='movie-entry'>
                        <img src={movie.poster_url} className='poster' alt={movie.title} />
                        <span className='details'>
                            <p className='title'>{movie.title}</p>
                            <p className='release-date'>Release Date: {movie.release_date}</p>
                            <p className='overview'>{movie.overview}</p>
                            <p>Genres: {movie.genres.split(', ').map(id => genresMap[parseInt(id)]).join(', ')}</p>
                            <p>Rating: <b>{movie.rating}</b></p>
                            <FontAwesomeIcon icon={faTrash} className='thrash-icon' onClick={() => handleDelete(movie.id)} />
                        </span>
                    </span>
                })}
    </div>
}