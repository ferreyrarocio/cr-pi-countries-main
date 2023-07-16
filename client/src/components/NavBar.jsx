import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

//* atenti la funcion que busca posta es handleSearch y está en Home
// la prop onSearch desestrcuturada
const Navbar = ({ onSearch }) => {
  const [name, setName] = useState("");
// es una variable de estado 

  const buscar = () => {
    onSearch(name);
  };
//*  esta función toma el valor del campo de búsqueda (name) 
//*  y lo pasa a la función onSearch que se proporciona 
//*  como una prop al componente Navbar.


  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      buscar();
    }
  };

  return (
    <div className={styles.navbar}>

<div className={styles.nav}>
      <div className={styles.searchbar}>
        
        <input 
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          //*  Cuando el usuario escribe en el campo de búsqueda, 
          //*  la función onChange del input se activa y actualiza el valor de searchQuery
          //*  utilizando setSearchQuery(event.target.value). 
          //*  Esto significa que searchQuery siempre tiene el valor actualizado 
          // * del campo de búsqueda.
          onKeyPress={handleKeyPress}
          placeholder=" buscá tu país favorito..."
          className={styles.input}
        />
        <button onClick={buscar} className={styles.buscar}>
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
