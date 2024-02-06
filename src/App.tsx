import React from 'react';
import logo from './logo.svg';
import { MoviesList, FileInput } from './Components';
import './App.css';
import { FetchedMovieType, useSaveMovies } from './hooks';
import { languageDictionary } from './Components/utils';


function App() {
  const [selectedMovies, setSelectedMovies] = React.useState<string[]>([])
  const [savedMovies, setSavedMovies] = React.useState<FetchedMovieType[]>([])
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>('en-GB')
  const [mode, setMode] = React.useState<'Search' | 'Save'>('Search')

  const { saveMovies } = useSaveMovies(savedMovies)

  const handleButtonClick = () => {
    if (mode === 'Search') {
      setMode('Save')
    } else {
      // setMode('Search')
      saveMovies()
    }
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value)
  }
  return (
    <div className="App">
      {mode === 'Search' ? <FileInput selection={selectedMovies} selectMovies={setSelectedMovies} /> : <MoviesList movies={selectedMovies} savedMovies={savedMovies} setSavedMovies={setSavedMovies} language={selectedLanguage} />}
      <div className="search-container">
        <button onClick={() => handleButtonClick()}>{mode}</button>
        {mode === "Search" && <img
          className="language"
          alt={languageDictionary.selectedLanguage}
          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedLanguage.split('-')[1]}.svg`}
        />}
      </div>
      {mode === "Search" && <><label htmlFor="languageDropdown">Select Language: </label>
        <select
          id="languageDropdown"
          value={selectedLanguage}
          onChange={e => handleLanguageChange(e)}
        >
          <option value="">Select a language</option>
          {Object.entries(languageDictionary).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select></>}
    </div>
  );
}

export default App;
