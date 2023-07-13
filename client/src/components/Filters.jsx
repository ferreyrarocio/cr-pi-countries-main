import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  filterByContinent,
  filterByActivity,
  sortAction,
  trackFiltersActivities,
  trackFiltersSort,
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

      await dispatch(sortAction(filters.sort));
      await dispatch(filterByContinent(event.target.value));
      console.log(filter);
    } catch (error) {
      console.log("Error al filtrar", error);
    }
  };

  const handleFilterActivities = async (event) => {
    try {
      if (event.target.value === "") {
        await dispatch(getCountries());
        await dispatch(filterByContinent(filters.continent));
        dispatch(trackFiltersActivities(""));
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
      // Limpiar el orden
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
          <option value="">Continentes mezclados</option>
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
          <option value="">Actividades tipicas</option>
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
            Orden alfabetico:
          </option>
          <option className={style.option} value="name-asc">Paises de la A-Z</option>
          <option value="name-desc">Paises de la Z-A</option>
          <option value="population-asc">Población de - a +</option>
          <option value="population-desc">Población de + a -</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
