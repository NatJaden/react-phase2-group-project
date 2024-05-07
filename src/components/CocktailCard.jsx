import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function CocktailCard({ id, name, ingredients, image }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>Ingredients: {ingredients.join(', ')}</p>
      <img src={image} alt="Cocktail" />
      <Link to={`/cocktail/${id}`}>Details</Link>
    </div>
  );
}

export function CocktailDetails() {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(response => response.json())
      .then(data => setCocktail(data.drinks[0]))
      .catch(error => console.log(error));
  }, [id]);

  if (!cocktail) return <div>Loading...</div>;

  const ingredients = Object.keys(cocktail)
    .filter(key => key.startsWith('strIngredient') && cocktail[key])
    .map(key => cocktail[key]);

  return (
    <div>
      <h2>{cocktail.strDrink}</h2>
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
      <p>Ingredients: {ingredients.join(', ')}</p>
    </div>
  );
}

export default CocktailCard;
