import { useState } from "react";

function CreateCocktailForm() {
  // Added state for managing form data
  const [cocktailData, setCocktailData] = useState({
    name: "",
    image_url: "",
    category: "",
    garnish: "",
    ingredients: "",
  });
  // created a function to handle changes in the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCocktailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //created a function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/cocktails", {
      // Sending a POST request add a new cocktail
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
        console.log("Cocktail added:", data);
        // Resetting the form fields after the addition of a new cocktail
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
      {/* created a form */}
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
        <button className="form-button" type="submit">
          Add Cocktail
        </button>
      </form>
    </div>
  );
}

export default CreateCocktailForm;
