import React, { useState, useEffect } from 'react';

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
                console.log(data)
                setCocktails(data)
            })
            .catch((error) => console.log("Error:", error));
    }

    useEffect(() => {
        fetchCocktails();
    }, []);

    return (
        <>
            <h2 style={{ textAlign: 'center' }}>Cocktail List</h2>
            <div className="cocktail-grid">
                {cocktails.map(cocktail => (
                    <div className="cocktail-card" key={cocktail.id}>
                        <h3>{cocktail.name}</h3>
                        <img src={cocktail.image_url} alt={cocktail.name} />
                        <p>Category: {cocktail.category}</p>
                        <p>Garnish: {cocktail.garnish}</p>
                        <ul>
                            {Object.entries(cocktail.ingredients).map(([ingredient, measure]) => (
                                <li key={ingredient}>{ingredient}: {measure}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
    
}

export default Cocktails;
