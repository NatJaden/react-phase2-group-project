import React, { useState, useEffect } from 'react';
import CocktailCard from './CocktailCard';

function CocktailList() {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api.php')
      .then(response => response.json())
      .then(data => setCocktails(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h2>Cocktail List</h2>
      <div className="card-container">
        {cocktails.map(cocktail => (
          <CocktailCard key={cocktail.id} {...cocktail} />
        ))}
      </div>
    </div>
  );
}

export default CocktailList;
