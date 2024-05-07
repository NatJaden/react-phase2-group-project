import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import UserProfile from './pages/UserProfile';
import CocktailList from './pages/CocktailList';
import CreateCocktail from './pages/CreateCocktail';

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
        <div className="dashboard">
          <NavBar />
          <div className="content">
            <CocktailList />
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
            <CreateCocktail />
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
