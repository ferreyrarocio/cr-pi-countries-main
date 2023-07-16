import style from "./Detail.module.css";
import axios from "axios";
import { useParams } from "react-router-dom"; //* importstn p obtener los parámetros de la URL
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();

  const [countryDetail, setCountryDetail] = useState([]);
//* para almacenar la información del país obtenida de la solicitud.

  useEffect(() => { //*para realizar la solicitud a la API con la ayuda de axios :)
    axios(`countries/${id}`).then(({ data }) => {
      data.name
        ? setCountryDetail(data)
        : window.alert("el pais no fue encontrado, probá de nuevo!");
    });
  }, [id]);

  if (countryDetail.length === 0) {
    return (
      <div className={style.containerError}>
        <div className={style.cuadrado}>
          {" "}
          <h1 className={style.errorCode}>404</h1>
          <p className={style.errorMessage}>Country not found</p>
          <div className={style.buttonContainer}>
            <NavLink to="/home">
              <button className={style.button2}>
                regresar a la página principal
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  const {
    name,
    flag,
    continents,
    capital,
    subregion,
    area,
    population,
    Activities,
  } = countryDetail;

  const formattedArea = Number(area).toLocaleString("es-ES");
  const formattedPopulation = Number(population).toLocaleString("es-ES");

  return (
    <main className={style.container}>
      <div className={style.detalles}>
      <Link to={"/home"}>
        <button className={style.button2}>
          regresar a la página principal
        </button>
      </Link>

      <legend className={style.titulo}>
        {name}, {id}
      </legend>

      {flag && <img className={style.bandera} src={flag} alt="" />}
      <div class="hr">
  <span class="icon fa fa-star"></span>
   
</div>
      <label><u> Continente:</u>  {continents}</label>
      <div class="hr"> <div class="hr"> <span></span> </div> </div>
      <label><u>Capital:</u> {capital}</label>
      <div class="hr"> <span></span> </div>
      <label><u>Subregión:</u> {subregion}</label>
      <div class="hr"> <span></span> </div>
      <label><u>Area:</u> {formattedArea} km<sup>2</sup></label>
      <div class="hr"> <span></span> </div>
      <label><u>Población:</u> {formattedPopulation} habitantes</label>
      <div class="hr"> <span></span> </div>
      <label>★</label>

      </div>

      <div className={style.detalles}>
    
        {!Activities ? ( 
          <label>no hay actividades cargadas para este país</label>
        )  : (
          <div className={style.activities}>
             <Link to={"/form"}>
        <button className={style.botonposta}>
          agregar una actividad
        </button>
      </Link>
            {Activities.map((act) => (
              <div className={style.activityItem} key={act.id}>
               
                <legend className={style.titulo}>{act.name}</legend>
                <div className={style.activityDetails}>
                  <label><u>Dificultad:</u> {act.difficulty}</label>
                  <div class="hr"> <span></span> </div>
                  <label><u>Duración:</u> {act.duration} horas</label>
                  <div class="hr"> <span></span> </div>
                  <label><u>Estación:</u> {act.season}</label>
                  <div class="hr"> <span></span> </div>
                  <label>...</label>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Detail;
