import { useState, useEffect } from "react";
import { FaCocktail } from "react-icons/fa";

function Instructions() {
  // State for managing fetched cocktails data and editing instructions
  const [cocktails, setCocktails] = useState([]);
  const [editingInstructionsId, setEditingInstructionsId] = useState(null);
  const [newInstructions, setNewInstructions] = useState("");

  // Created a function to fetch cocktails data from the server
  function fetchCocktails() {
    //GET request for fetching cocktail data
    fetch(`http://localhost:3000/cocktails`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("NO COCKTAILS FOUND");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Setting fetched cocktails data to state
        setCocktails(data);
      })
      .catch((error) => console.log("Error:", error));
  }

  // Added an use effect hook to fetch cocktails data when component mounts
  useEffect(() => {
    fetchCocktails();
  }, []);

  // created a function to handle editing instructions for a cocktail
  const handleEditInstructions = (id, instructions) => {
    setEditingInstructionsId(id);
    setNewInstructions(instructions);
  };

  // created a function to handle updating instructions for a cocktail
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

        fetchCocktails();
      })
      .catch((error) => console.error("Error:", error.message));
  };

  // Rendering the instructions for each cocktail
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        <FaCocktail style={{ marginRight: "5px" }} /> How to Make{" "}
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
                <button onClick={() => handleUpdateInstructions(cocktail.id)}>
                  Save
                </button>
              </div>
            ) : (
              <div>
                <p>{cocktail.instructions}</p>
                <button
                  onClick={() =>
                    handleEditInstructions(cocktail.id, cocktail.instructions)
                  }
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Instructions;
