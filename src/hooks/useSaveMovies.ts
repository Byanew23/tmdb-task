import React from 'react'
import { FetchedMovieType } from './useFetchMovies'
export const useSaveMovies = (movies: FetchedMovieType[]) => {

    const mockSaveUrl = '/api/saveSelection'

    const saveMovies = () => {
        fetch(mockSaveUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ movies: movies })
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Failed to post movies! Error Code: ${response.status}`);
            }
            return response.json();
        })
            .then(data => {
                console.log('Movies successfully posted:', data);
            })
            .catch(error => {
                console.error('Error posting movies:', error.message);
            });
    }

    return { saveMovies }
}