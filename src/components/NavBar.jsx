import { FaHome, FaCocktail } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function NavBar() {
  // created an array containing navigation items with their path, name, and icon
  const itemList = [
    {
      path: "/",
      name: "Home",
      icon: <FaHome />, 
    },
    {
      path: "/cocktail",
      name: "Cocktail List",
      icon: <FaCocktail />, 
    },
    {
      path: "/type",
      name: "Alcoholic vs Non-Alcoholic",
      icon: <FaCocktail />,
    },
    {
      path: "/instructions",
      name: "Recipe/How to Make",
      icon: <FaCocktail />, 
    },
  ];

  return (
    <div className="navbar">
      <h1>Lets Explore!</h1>
      <div className="links">
        {/* mapping through itemList array and render NavLink for each item */}
        {itemList.map((item, index) => (
          <NavLink key={index} to={item.path} activeClassName="active">
            {/* rendering an icon and name for each navigation item */}
            <div>
              {item.icon}
              <span>{item.name}</span>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default NavBar;
