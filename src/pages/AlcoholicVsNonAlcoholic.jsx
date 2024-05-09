import React, { useState, useEffect } from "react";
import { FaCocktail, FaSearch } from 'react-icons/fa';

function AlcoholicVsNonAlcoholic() {
    const [cocktails, setCocktails] = useState([]);
    const [alcoholicCocktails, setAlcoholicCocktails] = useState([]);
    const [nonAlcoholicCocktails, setNonAlcoholicCocktails] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch(`http://localhost:3000/cocktails`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch cocktails");
                }
                return response.json();
            })
            .then(data => {
                setCocktails(data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }, []);

    useEffect(() => {
        const filteredAlcoholic = cocktails.filter(cocktail =>
            cocktail.category.toLowerCase() === "alcoholic" &&
            cocktail.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const filteredNonAlcoholic = cocktails.filter(cocktail =>
            cocktail.category.toLowerCase() === "non-alcoholic" &&
            cocktail.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setAlcoholicCocktails(filteredAlcoholic);
        setNonAlcoholicCocktails(filteredNonAlcoholic);
    }, [cocktails, searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search cocktails..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <FaSearch className="search-icon" />
            </div>

            {/* Alcoholic Drinks */}
            <h2 style={{ textAlign: "center" }}>
                <FaCocktail style={{ marginRight: '5px' }} /> Alcoholic Drinks <FaCocktail style={{ marginLeft: '5px' }} />
            </h2>
            <div className="cocktail-grid">
                {alcoholicCocktails.map((cocktail) => (
                    <div className="cocktail-card" key={cocktail.id}>
                        <h3>{cocktail.name}</h3>
                        <img src={cocktail.image_url} alt={cocktail.name} />
                        <p>Category: {cocktail.category}</p>
                        <p>Garnish: {cocktail.garnish}</p>
                        <p>Ingredients: {cocktail.ingredients}</p>
                    </div>
                ))}
            </div>

            {/* Non-Alcoholic Drinks */}
            <h2 style={{ textAlign: "center" }}>
                <FaCocktail style={{ marginRight: '5px' }} /> Non-Alcoholic Drinks <FaCocktail style={{ marginLeft: '5px' }} />
            </h2>
            <div className="cocktail-grid">
                {nonAlcoholicCocktails.map((cocktail) => (
                    <div className="cocktail-card" key={cocktail.id}>
                        <h3>{cocktail.name}</h3>
                        <img src={cocktail.image_url} alt={cocktail.name} />
                        <p>Category: {cocktail.category}</p>
                        <p>Garnish: {cocktail.garnish}</p>
                        <p>Ingredients: {cocktail.ingredients}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default AlcoholicVsNonAlcoholic;
