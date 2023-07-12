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

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  const handleSearch = async (searchQuery) => {
    try {
      if (searchQuery === "") {
        dispatch(getCountries());
      } else {
        dispatch(searchCountries(searchQuery));
      }
    } catch (error) {
      console.log("Error al buscar", error);
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
