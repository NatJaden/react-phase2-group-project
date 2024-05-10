import { useState, useEffect } from "react";
import { FaCocktail } from "react-icons/fa";

function Cocktails() {
  // State to store the list of cocktails
  const [cocktails, setCocktails] = useState([]);

  // created a function to fetch cocktails from the server
  function fetchCocktails() {
    fetch(`http://localhost:3000/cocktails`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("NO COCKTAILS FOUND");
        }
        return response.json();
      })
      .then((data) => {
        // Setting cocktails state with the fetched data
        setCocktails(data);
      })
      .catch((error) => console.log("Error:", error));
  }

  // Fetching cocktails when the component mounts
  useEffect(() => {
    fetchCocktails();
  }, []);

  // created a function to handle deletion of a cocktail
  function handleDelete(id) {
    fetch(`http://localhost:3000/cocktails/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete cocktail");
        }
        // Updating the state after deletion by filtering out the deleted cocktail
        setCocktails(cocktails.filter((cocktail) => cocktail.id !== id));
      })
      .catch((error) => console.error("Error:", error.message));
  }

  return (
    <>
      <h2 style={{ textAlign: "center" }}>
        <FaCocktail style={{ marginRight: "5px" }} /> Cocktail List{" "}
        <FaCocktail style={{ marginLeft: "5px" }} />
      </h2>
      {/* Cocktail list */}
      <div className="cocktail-grid">
        {/* Mapping through cocktails array and render each cocktail */}
        {cocktails.map((cocktail) => (
          <div className="cocktail-card" key={cocktail.id}>
            <h3>{cocktail.name}</h3>
            <img src={cocktail.image_url} alt={cocktail.name} />
            <p>Category: {cocktail.category}</p>
            <p>Garnish: {cocktail.garnish}</p>
            <p>Ingredients: {cocktail.ingredients}</p>
            {/* Button to delete the cocktail */}
            <button className="delete" onClick={() => handleDelete(cocktail.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Cocktails;
