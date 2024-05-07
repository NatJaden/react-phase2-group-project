import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import { CocktailDetails } from './components/CocktailCard';
import CocktailList from './components/CocktailList';
import CocktailCard from './components/CocktailCard';

const App = () => {
  const [cocktails, setCocktails] = useState([]);

  const searchCocktails = async (query) => {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setCocktails(data.drinks);
    } catch (error) {
      console.error('Error fetching cocktails:', error);
    }
  };

  return (
    <div>
      <h1>Cocktail App</h1>
      <SearchBar onSearch={searchCocktails} />
      <div>
        <h2>Results:</h2>
        <ul>
          {cocktails.map(cocktail => (
            <li key={cocktail.idDrink}>{cocktail.strDrink}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

  function App() {
    return (
      <div className="App">
        <CocktailList />
        <CocktailCard />
        <CocktailDetails />
      </div>
    );
  }
export default App;

