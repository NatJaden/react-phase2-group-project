import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function CocktailCard({ id, name, ingredients, image, onDelete }) {
  const [showIngredients, setShowIngredients] = useState(false);

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="card">
      <h3>{name}</h3>
      <img src={image} alt="Cocktail" />
      <button onClick={() => setShowIngredients(!showIngredients)}>
        {showIngredients ? 'Hide Ingredients' : 'Show Ingredients'}
      </button>
      <button onClick={handleDelete}>Delete</button>
      {showIngredients && (
        <div>
          <p>Ingredients: {ingredients.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export function CocktailDetails() {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/cocktails/${id}`) 
      .then(response => response.json())
      .then(data => setCocktail(data))
      .catch(error => console.log(error));
  }, [id]);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/cocktails/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        console.log('Cocktail deleted successfully');
      } else {
        console.error('Failed to delete cocktail');
      }
    })
    .catch(error => console.error('Error deleting cocktail:', error));
  };

  if (!cocktail) return <div>Loading...</div>;

  return (
    <div>
      <h2>{cocktail.name}</h2>
      <img src={cocktail.image} alt={cocktail.name} />
      <p>Ingredients: {cocktail.ingredients.join(', ')}</p>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  );
}

export default CocktailCard;
