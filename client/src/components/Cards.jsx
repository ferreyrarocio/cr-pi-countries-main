import { useState, useEffect } from "react";
import Card from "./Card";
import style from "./Cards.module.css";

const Cards = ({ countries }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 10;
  const maxPageNumbers = 30;

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const totalPages = Math.ceil(countries.length / countriesPerPage);

  let pageNumbers = [];
  if (totalPages <= maxPageNumbers) {
    pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  } else {
    const middlePage = Math.floor(maxPageNumbers / 2);
    if (currentPage <= middlePage) {
      pageNumbers = Array.from(
        { length: maxPageNumbers },
        (_, index) => index + 1
      );
    } else if (currentPage > totalPages - middlePage) {
      pageNumbers = Array.from(
        { length: maxPageNumbers },
        (_, index) => totalPages - maxPageNumbers + index + 1
      );
    } else {
      pageNumbers = Array.from(
        { length: maxPageNumbers },
        (_, index) => currentPage - middlePage + index
      );
    }
  }

  const nextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1); // Reiniciar la página a 1 cuando el arreglo de países cambie
  }, [countries]);

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

export default Cards;
