import { NavLink } from "react-router-dom";
import style from "./Landing.module.css";
import React, { useState } from "react";

import rocio from "../../src/assets/rocio.jpg";
import pepe from "../../src/assets/pepe.png";
import fede from "../../src/assets/fede.jpg";
import cande from "../../src/assets/cande.jpg";
import pachu from "../../src/assets/pachu.jpg";

const Landing = () => {
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [perfiles, setPerfiles] = useState([]);

  const agregarPerfil = () => {
      setPerfiles([...perfiles, {  foto: fotoPerfil }]);
      setFotoPerfil(null);
  };

  const eliminarPerfil = (perfil) => {
    const nuevosPerfiles = perfiles.filter((p) => p.foto !== perfil.foto);
    setPerfiles(nuevosPerfiles);
  };

  const handleFotoChange = (e) => {
    const foto = e.target.files[0];
    setFotoPerfil(URL.createObjectURL(foto));
  };

  return (
    <div className={style.todo}>
      <label className={style.title}>Bienvenido!</label>
      <h3 className={style.texto}>
        {" "}
        listo para tus vacaciones ideales? Presioná las banderas y accederás a
        datos importantes y a las actividades más recomendadas para que
        disfrutes al máximo!!
      </h3>
      <label className={style.texto2}> ....éxitosミ★ </label>
      <button className={style.buttonu}>quién esta planeando las vacaciones?</button>
      <NavLink to="/home">
      <img className={style.foto} src={rocio} alt=""/>
      <img className={style.foto} src={fede} alt=""/>
      <img className={style.foto}src={cande} alt=""/>
      <img className={style.foto}src={pepe} alt=""/>   
      <img className={style.foto} src={pachu} alt=""/>
      </NavLink>

      <button className={style.buttonu}>no estás entre las opciones? podés crear tu propio perfil! </button>
    
      <input type="file" onChange={handleFotoChange} />
      <button className={style.button} onClick={agregarPerfil}>
        crear mi perfil
      </button>
      <ul>
        {perfiles.map((perfil) => (
          //la etiqueta li es un punto
          <li key={perfil.foto} className={style.text}>
            <NavLink to="/home">
            <img className={style.foto} src={perfil.foto} alt=""/>
            </NavLink>
            <button className={style.buttonx} onClick={() => eliminarPerfil(perfil)}>eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Landing;

//! esto es una farsa porque no está configurado, los supuestos perfiles no están guardados 
//! en el el estado y menos el perfil nuevo que se borra al actualizar la página jsjds, 
//! pero hablando en terminos de marketing funciona porque los hice sentir incorporados 
//! dándoles la opción de crear su propio perfil y asi me compran viajes hasta q se dan cuenta 
//! q no les cree ningun perfil... me compran viajes VISTE yo ya pienso q es una pagina d verdad 
//! yo no vendo viajes es una tarea y en ningun lado dice q sea para vender viajes me lo invente yo...
//!  anyways quiero arreglar esto y agregar los favoritos pero no se si me va a dar tiempo capaz rompa todo