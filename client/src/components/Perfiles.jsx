import React, { useState } from 'react';
import rocio from "../../src/assets/rocio.jpg";
import pepe from "../../src/assets/pepe.png";
import fede from "../../src/assets/fede.jpg";
import cande from "../../src/assets/cande.jpg";
import pachu from "../../src/assets/pachu.jpg";
// Importa todas las fotos predeterminadas que desees utilizar

import style from "./Perfiles.module.css";

const Perfiles = () => {
  const [nuevoPerfil, setNuevoPerfil] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [perfiles, setPerfiles] = useState([
    { nombre: 'Perfil de prueba', foto: cande },
  ]);

  const agregarPerfil = () => {
    if (nuevoPerfil !== '') {
      setPerfiles([...perfiles, { nombre: nuevoPerfil, foto: fotoPerfil || cande }]);
      setNuevoPerfil('');
      setFotoPerfil(null);
    }
  };

  const eliminarPerfil = (perfil) => {
    const nuevosPerfiles = perfiles.filter((p) => p.nombre !== perfil.nombre);
    setPerfiles(nuevosPerfiles);
  };

  const handleFotoChange = (e) => {
    const foto = e.target.files[0];
    setFotoPerfil(URL.createObjectURL(foto));
  };

  const seleccionarFotoPredeterminada = (foto) => {
    setFotoPerfil(foto);
  };

  return (
    <div>
      <h1>Perfiles</h1>
      <input
        type="text"
        value={nuevoPerfil}
        onChange={(e) => setNuevoPerfil(e.target.value)}
        placeholder="Nuevo perfil"
      />
      <input type="file" onChange={handleFotoChange} />
      <button onClick={agregarPerfil}>Agregar</button>
      <ul>
        {perfiles.map((perfil) => (
          <li key={perfil.nombre}>
            <img className={style.foto} src={perfil.foto} alt={perfil.nombre} />
            {perfil.nombre}
            <button onClick={() => eliminarPerfil(perfil)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <h2>Fotos predeterminadas</h2>
      <div>
        <img src={cande} alt="Foto predeterminada 1" onClick={() => seleccionarFotoPredeterminada(cande)} />
        <img src={rocio} alt="Foto predeterminada 2" onClick={() => seleccionarFotoPredeterminada(rocio)} />
        {/* Agrega más imágenes predeterminadas con sus respectivas funciones onClick */}
      </div>
    </div>
  );
};

export default Perfiles;
