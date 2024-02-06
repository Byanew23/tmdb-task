import React from 'react'
import { useGetSearchResults, FetchedMovieType } from '../../hooks'
import './searchBar.css'

export const SearchBar = ({ language, addMovie }: { language: string, addMovie: (movie: FetchedMovieType) => void }) => {
    const [searchTerm, setSearchTerm] = React.useState<string>('')
    const [searchResults, setSearchResults] = React.useState<FetchedMovieType[]>([])


    const fetchedSearchResults = useGetSearchResults(searchTerm, language)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const handleAddSearchResult = (movie: FetchedMovieType) => {
        addMovie(movie)
        setSearchTerm('')
    }

    React.useEffect(() => {
        if (fetchedSearchResults && JSON.stringify(fetchedSearchResults) !== JSON.stringify(searchResults)) {
            setSearchResults(fetchedSearchResults)
        }

    }, [fetchedSearchResults])

    return (<div className='search-wrapper'><input className='search-bar' value={searchTerm} onChange={e => handleSearch(e)} />
        {searchTerm && <span className='clear-sb' onClick={() => setSearchTerm('')}>x</span>}
        {searchResults.length ? <div className={`search-results`} >{searchResults.map(result => <div className='search-result' onClick={() => handleAddSearchResult(result)} >
            <img src={result.poster_url} alt={result.title} className="sr-image" /><span>{result.title}</span>
        </div>)}</div> : <></>
        }
    </div >)
}