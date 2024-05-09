import React, { useState } from "react";


function CreateCocktailForm() {
  const [cocktailData, setCocktailData] = useState({
    name: "",
    image_url: "",
    category: "",
    garnish: "",
    ingredients:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCocktailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/cocktails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cocktailData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add cocktail");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the newly added cocktail
        console.log("Cocktail added:", data);
        setCocktailData({
          name: "",
          image_url: "",
          category: "",
          garnish: "",
          ingredients: "",
        });
      })
      .catch((error) => console.error("Error:", error.message));
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Cocktail</h2>
      <form onSubmit={handleSubmit}>
        <label className="form-label">
          Name:
          <input
            className="form-input"
            type="text"
            name="name"
            value={cocktailData.name}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Image URL:
          <input
            className="form-input"
            type="text"
            name="image_url"
            value={cocktailData.image_url}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Category:
          <input
            className="form-input"
            type="text"
            name="category"
            value={cocktailData.category}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Garnish:
          <input
            className="form-input"
            type="text"
            name="garnish"
            value={cocktailData.garnish}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Ingredients:
          <input
            className="form-input"
            type="text"
            name="ingredients"
            value={cocktailData.ingredients}
            onChange={handleChange}
          />
        </label>
        <button className="form-button" type="submit">Add Cocktail</button>
      </form>
    </div>
  );
}

export default CreateCocktailForm;
