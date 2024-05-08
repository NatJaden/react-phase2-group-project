import React, { useState } from 'react';

function Form() {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const configObj = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, ingredients: ingredients.split(',') })
    };

    fetch('http://localhost:3001/cocktails', configObj)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setName('');
        setIngredients('');
      })
      .catch(error => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="text" placeholder="Ingredients (comma separated)" value={ingredients} onChange={e => setIngredients(e.target.value)} />
      <button type="submit">Add Cocktail</button>
    </form>
  );
}

export default Form;
