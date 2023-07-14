import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.navbar}>

<div className={styles.nav}>
      <div className={styles.searchbar}>
        
        <input 
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          onKeyPress={handleKeyPress}
          placeholder=" buscá tu país favorito..."
          className={styles.input}
        />
        <button onClick={handleSearch} className={styles.buscar}>
          🔍
        </button>
        
      </div>

      
      <NavLink to="/">
        <button className={styles.botonc}>cambiar de usuario</button>
      </NavLink>
      

</div>

      
<div className={styles.boton}>
      <NavLink to="/form">
        <button className={styles.botonposta}>registrar una actividad</button>
      </NavLink>
      </div>

    </div>
  );
};

export default Navbar;
