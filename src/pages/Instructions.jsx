import React, { useState, useEffect } from 'react';
import { FaCocktail } from "react-icons/fa";

function Instructions() {
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

  return (
    <div>
     <h2 style={{ textAlign: "center" }}>
        <FaCocktail style={{ marginRight: "5px" }} /> How to Make {" "}
        <FaCocktail style={{ marginLeft: "5px" }} />
      </h2>
      <div className="cocktail-grid">
        {cocktails.map((cocktail) => (
          <div className="cocktail-card" key={cocktail.id}>
            <h3>{cocktail.name}</h3>
            <img src={cocktail.image_url} alt={cocktail.name} />
            <p>{cocktail.instructions}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Instructions;
