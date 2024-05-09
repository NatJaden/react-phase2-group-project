import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import UserProfile from './pages/UserProfile';
import CocktailList from './pages/CocktailList';
import AlcoholicVsNonAlcoholic from './pages/AlcoholicVsNonAlcoholic';

function App() {
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
          <div className="content">
            <CocktailList />
          </div>
      ),
    },
  
    {
      path: '/profile',
      element: (
          <div className="content">
            <UserProfile />
          </div>
      ),
    },
    {
      path: '/type',
      element: (
          <div className="content">
            <AlcoholicVsNonAlcoholic />
          </div>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
