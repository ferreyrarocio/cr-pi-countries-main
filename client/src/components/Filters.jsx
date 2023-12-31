import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  filterByContinent,
  filterByActivity,
  sortAction,
  trackFiltersActivities,
  trackFiltersSort,
  trackFiltersContinents
} from "../redux/actions";
import style from "./Filters.module.css";
import React from "react";

const Filters = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const filters = useSelector((state) => state.filters);
  let filter = useSelector((state) => state.filter);
  const activities = useSelector((state) => state.activities);

  const handleFilterContinent = async (event) => {
    try {
      await dispatch(getCountries());

      console.log(filter);
      if (filters.activity) {
        await dispatch(filterByActivity(filters.activity, filter, countries));
      }
//* verifica si hay un filtro de actividad activo.si es así, se llama a la acción :)

      await dispatch(sortAction(filters.sort));
//* lo ordeno alfabeticam o por habitantes jeje

      await dispatch(filterByContinent(event.target.value));
      dispatch(trackFiltersContinents(event.target.value));
      console.log(filter);
//* llamo a la acción según el continente q seleccioné
    } catch (error) {
      console.log("Error al filtrar", error);
    }
  };

  const handleFilterActivities = async (event) => {
    try {
      if (event.target.value === "") {
//* esta es la opcion de "todas las actividades"
        await dispatch(getCountries());
        await dispatch(filterByContinent(filters.continent));
        dispatch(trackFiltersActivities(""));
//* importante!! para almacenar el ID de la actividad seleccionada en el estado
      } else {
        const activityId = event.target.value;

        await dispatch(getCountries());
        await dispatch(filterByActivity(activityId, filter, countries));
        await dispatch(filterByContinent(filters.continent));
        await dispatch(trackFiltersActivities(activityId));

        if (filters.sort) {
          await dispatch(sortAction(filters.sort));
        }
      }
    } catch (error) {
      console.log("Error al filtrar", error);
    }
  };

  const handleSortBy = async (event) => {
    const sortByValue = event.target.value;

    await dispatch(trackFiltersSort(event.target.value));

    if (sortByValue === "") {
//* son las opciones por defecto (limpiar el orden)
      await dispatch(getCountries());
      await dispatch(filterByContinent(filters.continent));
    } else {
      dispatch(sortAction(sortByValue));
    }
  };

  return (
    <div className={style.filters}>
      <div className={style.filter}>
        <select
          id="continent-filter"
          className={style.select}
          onChange={handleFilterContinent}
        >
          <option value="">MUNDIAL</option>
          <option value="North America">Norteamérica</option>
          <option value="South America">Sudamérica</option>
          <option value="Africa">África</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceanía</option>
        </select>
      </div>

      <div className={style.filter}>
        <select
          id="activity-filter"
          className={style.select}
          onChange={handleFilterActivities}
        >
          <option value="">ACTIVIDADES TÍPICAS</option>
          {activities.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.name}
            </option>
          ))}
        </select>
      </div>

      <div className={style.filter}>
        <select id="sort-by" className={style.select} onChange={handleSortBy}>
          <option value="All" disabled selected>
            POBLACIÓN:
          </option>
          <option value="population-+">Población de - a +</option>
          <option value="population+-">Población de + a -</option>
        </select>
      </div>
      
      <div className={style.filter}>
        <select id="sort-by" className={style.select} onChange={handleSortBy}>
          <option value="All" disabled selected>
            ORDEN ALFABÉTICO:
          </option>
          <option className={style.option} value="name-a-z">
            Paises de la A-Z
          </option>
          <option value="name-z-a">Paises de la Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
