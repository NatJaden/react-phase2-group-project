import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import UserProfile from './pages/UserProfile';
import SearchBar from './components/SearchBar';
import CocktailList from './components/CocktailList';
import Form from './components/Form'

function App() {
  const [cocktails, setCocktails] = useState([]);

  const searchCocktails = async (query) => {
    try {
      const response = await fetch(`http://localhost:3000/cocktails?q=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setCocktails(data); 
    } catch (error) {
      console.error('Error fetching cocktails:', error);
    }
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <div className="dashboard">
          <NavBar />
          <div className="content">
            <HomePage />
          </div>
        </div>
      ),
    },
    {
      path: '/cocktail',
      element: (
        <div className="dashboard">
          <NavBar />
          <div className="content">
            <CocktailList />
          </div>
        </div>
      ),
    },
    {
      path: '/profile',
      element: (
        <div className="dashboard">
          <NavBar />
          <div className="content">
            <UserProfile />
          </div>
        </div>
      ),
    },
    {
      path: '/create',
      element: (
        <div className="dashboard">
          <NavBar />
          <div className="content">
            <Form />
          </div>
        </div>
      ),
    },

  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <h1>Cocktail App</h1>
      <SearchBar onSearch={searchCocktails} />
      <div>
        <h2>Results:</h2>
        <ul>
          {cocktails && cocktails.map(cocktail => (
            <li key={cocktail.id}>{cocktail.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;