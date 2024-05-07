import React, { useState } from 'react';
import SearchBar from './components/SearchBar';

const App = () => {
  const [cocktails, setCocktails] = useState([]);

  const searchCocktails = async (query) => {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setCocktails(data);
    } catch (error) {
      console.error('Error fetching cocktails:', error);
    }
  };

  return (
    <div>
      <h1>Cocktail App</h1>
      <SearchBar onSearch={searchCocktails} />
      {/* Display cocktails */}
    </div>
  );
};

export default App;



