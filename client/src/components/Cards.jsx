import { useState, useEffect } from "react";
import Card from "./Card";
import style from "./Cards.module.css";

const Cards = ({ countries }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 10;
  const maxPageNumbers = 30;

  const indexOfLastCountry = currentPage * countriesPerPage;
//* por ejemplo primera pagina x 10 = el ultimo pais es el decimo d todos
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
//* decimo elemento - 10perpage = el primero es el pais nro 0 de todos
//* 
  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );
//* slice devuelve una COPIA

  const totalPages = Math.ceil(countries.length / countriesPerPage);
//* hace el cálculo de cuantas paginas(spoiler:25) va a haber si solo puedo mostrar 10 x página

  let pageNumbers = [];
  if (totalPages <= maxPageNumbers) {
    pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  }
//* array.from tiene dos parametros: `
//* 1 especifica la longitud del arreglo que se va a crear
//* 2 es la la función de mapeo que asigna a cada elemento del arreglo el valor del índice más 1 :)
//* se suma 1 al índice es que los números de página generalmente se cuentan desde 1 en lugar de 0. 

//* index: se utiliza para representar la posición de un elemento dentro de un arreglo, 
//* y se utiliza para generar los números de página en la paginación.

  const nextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };
//* incrementa el nro de página actual si no se alcanzó la última página

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };
//* decrementa el nro de página actual si no se encuentra en la primera página

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);
//* establece el nro de página actual según el nro de página que se pasa como argumento

  useEffect(() => {
    setCurrentPage(1); 
  }, [countries]);
//* reinicia la página a 1 cuando el arreglo de países cambie (filtros x ej)

  return (
    <div>
      <div className={style.paginado}>
        <button
          disabled={currentPage === 1}
          onClick={prevPage}
          className={style.botonesp}
        >
          {"<--"} 
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => goToPage(pageNumber)}
            className={`${style.botonesp} ${
              currentPage === pageNumber ? style.ahora : ""
            }`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={nextPage}
          className={style.botonesp}
        >
          {"-->"}
        </button>
      </div>

      <div className={style.container}>
        {currentCountries?.map((country) => (
          <Card
            key={country.id}
            id={country.id}
            name={country.name}
            flag={country.flag}
            continents={country.continents}
          />
        ))}
      </div>
    </div>
  );
};

//* los botones de nro de página se generan a partir del arreglo pageNumbers 

export default Cards;
