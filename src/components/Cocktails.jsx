import React, { useState, useEffect } from "react";
import { FaCocktail } from "react-icons/fa";

function Cocktails() {
  const [cocktails, setCocktails] = useState([]);

  function fetchCocktails() {
    fetch(`http://localhost:3000/cocktails`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("NO COCKTAILS FOUND");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCocktails(data);
      })
      .catch((error) => console.log("Error:", error));
  }

  useEffect(() => {
    fetchCocktails();
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:3000/cocktails/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete cocktail");
        }
        // Update state after successful deletion
        setCocktails(cocktails.filter(cocktail => cocktail.id !== id));
      })
      .catch((error) => console.error("Error:", error.message));
  }


  return (
    <>
      <h2 style={{ textAlign: "center" }}>
        <FaCocktail style={{ marginRight: "5px" }} /> Cocktail List{" "}
        <FaCocktail style={{ marginLeft: "5px" }} />
      </h2>
      <div className="cocktail-grid">
        {cocktails.map((cocktail) => (
          <div className="cocktail-card" key={cocktail.id}>
            <h3>{cocktail.name}</h3>
            <img src={cocktail.image_url} alt={cocktail.name} />
            <p>Category: {cocktail.category}</p>
            <p>Garnish: {cocktail.garnish}</p>
            <p>Ingredients: {cocktail.ingredients}</p>
            <button onClick={() => handleDelete(cocktail.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Cocktails;
