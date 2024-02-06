import { useEffect, useState } from 'react'

export const TMDB_API_KEY = '137daf797a1d482f751b6615ed53d0f6'
const TMDB_API_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzdkYWY3OTdhMWQ0ODJmNzUxYjY2MTVlZDUzZDBmNiIsInN1YiI6IjY1YzBmMjVlZmM2NTM4MDE0OWU5YWZkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6fES6yJu8oJUuEpAzLl_XDFhJOuGDF4OqGf9UyUWDHM'

export interface FetchedMovieType {
    id: string,
    title: string,
    overview: string,
    poster_url: string,
    genres: string,
    release_date: string,
    rating: string,
}

export const useFetchMovies = ({ selectedMovies, language }: { selectedMovies: string[], language: string }) => {

    const [movies, setMovies] = useState<FetchedMovieType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviePromises = selectedMovies.map(movie =>
                    fetch(
                        `https://api.themoviedb.org/3/search/movie?query=${movie}&language=${language}&api_key=${TMDB_API_KEY}`,
                        {
                            method: 'GET',
                        }
                    ).then(res => {
                        if (!res.ok) {
                            throw new Error(`Failed to fetch! Error Code: ${res.status}`);
                        }
                        return res.json();
                    })
                );

                const allDataArray = await Promise.all(moviePromises);

                const updatedMovies = allDataArray.map((allData, index) => {
                    const data = allData.results[0];
                    return data
                        && {
                        title: data.title,
                        genres: `${data.genre_ids.join(', ')}`,
                        id: data.id,
                        overview: data.overview,
                        poster_url: `https://image.tmdb.org/t/p/original${data.poster_path}`,
                        rating: data.vote_average,
                        release_date: data.release_date
                    }

                });

                const filteredMovies = updatedMovies.filter(movie => movie !== null && movie !== undefined && !movies.includes(movie));

                setMovies(filteredMovies);
                setLoading(false);
            } catch (error) {
                // Handle errors
                console.error('Error fetching data:', (error as any).message);
                setLoading(false);
            }
        };

        fetchMovies();
    }, [selectedMovies]);

    return { movies, loading };
};

