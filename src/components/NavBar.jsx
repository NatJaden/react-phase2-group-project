import React from 'react';
import { FaHome, FaUser, FaCocktail, FaPlus } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

function NavBar() {
  const itemList = [
    {
      path: '/',
      name: 'Home',
      icon: <FaHome />,
    },
    {
      path: '/profile',
      name: 'Profile',
      icon: <FaUser />,
    },
    {
      path: '/cocktail',
      name: 'Cocktail List',
      icon: <FaCocktail />,
    },
    {
      path: '/type',
      name: 'Alcoholic vs Non-Alcoholic',
      icon: <FaCocktail />,
    },
    
  ];

  return (
    <div className="navbar">
      <h1>Navbar</h1>
      {itemList.map((item, index) => (
        <NavLink key={index} to={item.path} activeclassname="active">
          <div>
            {item.icon}
            <span>{item.name}</span>
          </div>
        </NavLink>
      ))}
    </div>
  );
}

export default NavBar;
