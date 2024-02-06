import React from 'react'
import { FetchedMovieType, TMDB_API_KEY } from './useFetchMovies'

export const useGetSearchResults = (searchTerm: string, language: string) => {
    const [results, setResults] = React.useState<FetchedMovieType[]>()

    React.useEffect(() => {
        if (!searchTerm) {
            setResults([])
        } else {


            const getResults = () => {
                fetch(
                    `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&language=${language}&api_key=${TMDB_API_KEY}`,
                    {
                        method: 'GET',
                    }
                ).then(res => {
                    if (!res.ok) {
                        throw new Error(`Failed to fetch! Error Code: ${res.status}`);
                    }
                    return res.json();
                }).then(data => {
                    const fetchedData: any[] = data.results.slice(0, 10);

                    const mappedResults: FetchedMovieType[] = fetchedData.map(res => {
                        return {
                            title: res.title,
                            genres: `${res.genre_ids.join(', ')}`,
                            id: res.id,
                            overview: res.overview,
                            poster_url: `https://image.tmdb.org/t/p/original${res.poster_path}`,
                            rating: res.vote_average,
                            release_date: res.release_date
                        }
                    })

                    setResults(mappedResults)
                })
            }

            getResults()
        }
    }, [searchTerm])

    return results
}