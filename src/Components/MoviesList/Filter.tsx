import React from 'react'
import { FetchedMovieType } from '../../hooks'
import { genresMap } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import './filters.css'


export const Filter = ({ movies, selectedFilters, setSelectedFilters }: { movies: FetchedMovieType[], selectedFilters: string[], setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>> }) => {

    const [openFilters, setOpenFilters] = React.useState<boolean>(false)
    const [availableGenres, setAvailablegenres] = React.useState<string[]>([])

    const extractUniqueGenres: (movies: FetchedMovieType[]) => string[] = (movies) => {
        const uniqueGenres: Set<string> = new Set();
        movies.forEach(movie => {
            const movieGenres = movie.genres.split(',').map(genre => genre.trim());
            movieGenres.forEach(genre => uniqueGenres.add(genre));
        });
        return Array.from(uniqueGenres);
    }

    const handleAddFilter = (genre: string) => {
        const tempFilters = [...selectedFilters]
        if (tempFilters.includes(genre)) {
            tempFilters.splice(tempFilters.indexOf(genre), 1)
        } else {
            tempFilters.push(genre)
        }

        setSelectedFilters(tempFilters)
    }


    React.useEffect(() => {
        const genres = extractUniqueGenres(movies)
        setAvailablegenres(genres)
    }, [movies])

    return (<><div className='filter'>
        <FontAwesomeIcon icon={faFilter} className='filter-icon' onClick={() => setOpenFilters(prev => !prev)} />
        {openFilters &&
            <div className='filters-body'>
                {availableGenres.map(x =>
                    <p key={x} onClick={() => handleAddFilter(x)} className="filter-item">{genresMap[parseInt(x)]}</p>
                )}
            </div>
        }

    </div>
        {selectedFilters.length ?
            <div className="filter-bar">{selectedFilters.map(filter => {
                return <div key={filter} className='filter-box' onClick={() => handleAddFilter(filter)}><span className='remove-filter' >x</span><span>{genresMap[parseInt(filter)]}</span></div>
            })}</div> : <></>}
    </>)

}