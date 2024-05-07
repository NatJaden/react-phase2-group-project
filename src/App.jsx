import React from 'react';
import { CocktailDetails } from './components/CocktailCard';
import CocktailList from './components/CocktailList';
import CocktailCard from './components/CocktailCard';


  function App() {
    return (
      <div className="App">
        <CocktailList />
        <CocktailCard />
        <CocktailDetails />
      </div>
    );
  }
export default App;

