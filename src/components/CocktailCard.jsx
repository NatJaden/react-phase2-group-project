import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function CocktailCard({ id, name, ingredients, image }) {
  const [showIngredients, setShowIngredients] = useState(false);

  return (
    <div className="card">
      <h3>{name}</h3>
      <img src={image} alt="Cocktail" />
      <button onClick={() => setShowIngredients(!showIngredients)}>
        {showIngredients ? 'Hide Ingredients' : 'Show Ingredients'}
      </button>
      {showIngredients && (
        <div>
          <p>Ingredients: {ingredients.join(', ')}</p>
        </div>
      )}
      <Link to={`/${id}`}>Details</Link>
    </div>
  );
}

export function CocktailDetails() {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    fetch(`/${id}`) 
      .then(response => response.json())
      .then(data => setCocktail(data))
      .catch(error => console.log(error));
  }, [id]);

  if (!cocktail) return <div>Loading...</div>;

  return (
    <div>
      <h2>{cocktail.name}</h2>
      <img src={cocktail.image} alt={cocktail.name} />
      <p>Ingredients: {cocktail.ingredients.join(', ')}</p>
    </div>
  );
}

export default CocktailCard;
