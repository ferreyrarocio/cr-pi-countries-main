import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createActivity,
  filterByActivity,
  getCountries,
} from "../redux/actions";
import style from "./Form.module.css";
import { Link, NavLink } from "react-router-dom";

const Form = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
//* para obtener la lista de países desde el estado global

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);
//* estados iniciales del form
  const [form, setForm] = useState({
    name: "",
    difficulty: 0,
    duration: 0,
    season: "",
    countries: [],
  });

  const [validationErrors, setValidationErrors] = useState({
    name: "",
    difficulty: "",
    duration: "",
  });
//* guarda los mensajes de error de validación para cada campo

  const handleInputChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setValidationErrors({ ...validationErrors, [event.target.name]: "" });
  };

  useEffect(() => {
    validateForm();
  }, [form]);

  const handleCountrySelect = (countryId) => {
    const selectedCountries = form.countries.includes(countryId)
      ? form.countries.filter((id) => id !== countryId)
      : [...form.countries, countryId];
//* va actualizando el estado al des/seleccionar los paises donde se puede relaixzar la act
    setForm({ ...form, countries: selectedCountries });
    setValidationErrors({ ...validationErrors, countries: "" });
  };

  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
  };


  // validaciones form

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (form.name.trim() === "") {
      errors.name = "designale un nombre a la actividad";
      valid = false;
    } else if (form.name.length > 25) {
      errors.name = "el nombre no puede exceder los 25 caracteres ni contener simbolos o numeros...";
      valid = false;
    } else if (!validateName(form.name)) {
      errors.name = "el nombre no puede exceder los 25 caracteres ni contener simbolos o numeros...";
      valid = false;
    }

    if (form.difficulty <= 0) {
      errors.difficulty = "el rango es de 1 a 5 , siendo 5 la más complicada";
      valid = false;
    }

    if (form.duration <= 0) {
      errors.duration = "el tiempo se mide en horas , no se aceptan minutos";
      valid = false;
    }
    
    if (!form.countries.length) {
      errors.countries = "seleccione por lo menos un país donde se pueda realizar la activdad";
      valid = false;
    }

    setValidationErrors(errors);
    return valid;
  };

// NO MANDAR EL FORMULARIO SI FALTAN DATOS!1!!

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const response = await dispatch(createActivity(form));
        if (response?.error) {
          alert(response.error);
        } else {
          await dispatch(filterByActivity(form));
          alert("Actividad guardada correctamente! Gracias por colaborar ♥");

          setForm({
            name: "",
            difficulty: 0,
            duration: 0,
            season: "",
            countries: [],
          });
          setValidationErrors({
            name: "",
            difficulty: "",
            duration: "",
          });
        }
      } catch (error) {
        console.log(error);
        alert("no se puede crear la actividad");
      }
    } else {
      alert("ocurrió un error en la validación de datos");
    }
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>

      <div className={style.botones}>
          <Link to="/home">
                <button className={style.button2}>regresar a página principal</button>
            </Link>
            </div>

        <label>
          actividad:
          <input 
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            className={style.input}
          />
          {validationErrors.name && (
            <span className={style.error}>{validationErrors.name}</span>
          )}
        </label>


        <hr className={style.hr}/>


        <label>
          dificultad: {form.difficulty}
          <input
            type="range"
            name="difficulty"
            min="1"
            max="5"
            value={form.difficulty}
            onChange={handleInputChange}
            className={style.input}
          />
          {validationErrors.difficulty && (
            <span className={style.error}>{validationErrors.difficulty}</span>
          )}
        </label>


        <hr className={style.hr}/>


        <label>
          horas requeridas: {form.duration}
          <input
       type="range"
       name="duration"
       min="1"
       max="12"
            value={form.duration}
            onChange={handleInputChange}
            className={style.input}
          />
          {validationErrors.duration && (
            <span className={style.error}>{validationErrors.duration}</span>
          )}
        </label>


        <hr className={style.hr}/>


        <label>
          en que estación? :
          <select
            name="season"
            value={form.season}
            onChange={handleInputChange}
            className={style.input}
          >
            <option value="" disabled selected>temporada:</option>
            <option value="verano">verano</option>
            <option value="otoño">otoño</option>
            <option value="invierno">invierno</option>
            <option value="primavera">primavera</option>
          </select>
        </label>


        <hr className={style.hr}/>


        <label>
        Donde? :
          <div className={style.countryList}>
            
              <div className={style.checkboxContainer}>
                {countries
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((country) => (
                    <label key={country.id}>
                      <input
                        type="checkbox"
                        name="countries"
                        value={country.id}
                        checked={form.countries.includes(country.id)}
                        onChange={() => handleCountrySelect(country.id)}
                        className={style.checkboxInput}
                      />
                      {country.name}
                    </label>
                  ))}
              </div>
          </div>
          {validationErrors.countries && (
            <span className={style.error}>{validationErrors.countries}</span>
          )}
        </label>


        <hr className={style.hr}/>

        
        <div className={style.botones}>
        <button type="submit" className={style.button}>
            guardar como actividad !
          </button>

            </div>
      </form>
    </div>
  );
};

export default Form;
