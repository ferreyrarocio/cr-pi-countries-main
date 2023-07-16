import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  searchCountries,
  getActivities,
} from "../redux/actions";
import Cards from "../components/Cards";
import Filters from "../components/Filters";
import Navbar from "../components/NavBar";
import style from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  let filter = useSelector((state) => state.filter);
//* filter es una variable local que se usa para almacenar el estado global 
//* useSelector es un capo q vuelve a renderizar el componente c/vex q cambia el estado

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

//* importante el arreglo vacío como segundo argumento 
//* asegura que los efectos se ejecuten solo UNA VEZ al montar el componente
//* evita que llame a la API innecesariamente

  const handleSearch = async (name) => {
    try {
      if (name === "") {
        dispatch(getCountries());
      } else {
        dispatch(searchCountries(name));
      }
    } catch (error) {
      console.log("errror al buscar", error);
    }
  };

  return (
    <div>
      <div className={style.home}>
        <Navbar onSearch={handleSearch} />

      <div>
        <Filters />
      </div>

        <div className={style.cards}>
          <Cards countries={filter} />
        </div>
      </div>
    </div>
  );
};

export default Home;

//* accedo a la función handleSearch a través de la prop onSearch

//* importante pasarle como prop la lista de paises filtrados!!! sino no anda

//* useEffect se utiliza para realizar tareas asincrónicas o de inicialización 
//* cuando el componente se monta, se actualiza o se desmonta