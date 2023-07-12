import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.searchbar}>
        
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder=" buscá tu país favorito..."
          className={styles.input}
        />
        <button onClick={handleSearch} className={styles.buscar}>
          🔍
        </button>
        
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
