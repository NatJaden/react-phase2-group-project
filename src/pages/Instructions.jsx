import React, { useState, useEffect } from 'react';
import { FaCocktail } from "react-icons/fa";

function Instructions() {
  const [cocktails, setCocktails] = useState([]);
  const [editingInstructionsId, setEditingInstructionsId] = useState(null);
  const [newInstructions, setNewInstructions] = useState("");

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

  const handleEditInstructions = (id, instructions) => {
    setEditingInstructionsId(id);
    setNewInstructions(instructions);
  };

  const handleUpdateInstructions = (id) => {
    fetch(`http://localhost:3000/cocktails/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ instructions: newInstructions }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update instructions");
        }
        setEditingInstructionsId(null);
        // Optionally, you can trigger a refetch of data to update the UI
        fetchCocktails();
      })
      .catch((error) => console.error("Error:", error.message));
  };

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
            {editingInstructionsId === cocktail.id ? (
              <div>
                <input
                  type="text"
                  value={newInstructions}
                  onChange={(e) => setNewInstructions(e.target.value)}
                />
                <button onClick={() => handleUpdateInstructions(cocktail.id)}>Save</button>
              </div>
            ) : (
              <div>
                <p>{cocktail.instructions}</p>
                <button onClick={() => handleEditInstructions(cocktail.id, cocktail.instructions)}>Edit</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Instructions;
