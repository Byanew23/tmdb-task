import React, { useState } from 'react';
import { MovieLine } from './MovieLine';

export const FileInput = ({ selection, selectMovies }: { selection: string[], selectMovies: React.Dispatch<React.SetStateAction<string[]>> }) => {
    const [fileContent, setFileContent] = useState<string[]>([]);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const content = e.target?.result as string;
                const splitMovies = content.split(/\r?\n/)

                setFileContent(splitMovies);
                selectMovies(splitMovies);
            };

            reader.readAsText(file);
        }
    };


    const handleCheckbox = (movie: string) => {
        const currentMovies = [...selection]
        const movieIndex = currentMovies.indexOf(movie)
        if (movieIndex !== -1) {
            currentMovies.splice(movieIndex, 1)
        } else {
            currentMovies.push(movie)
        }

        selectMovies(currentMovies)
    }

    return (
        <div>
            <input type="file" onChange={(e) => handleFileChange(e)} />
            <div className='movie-list'>
                <h3>File Content:</h3>
                {fileContent.map(movie => {
                    return <MovieLine key={movie} movie={movie} selected={selection.includes(movie)} checkMovie={() => handleCheckbox(movie)} />
                })}
            </div>
        </div>
    );
};
