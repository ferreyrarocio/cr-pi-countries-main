import { Link, NavLink } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ id, name, flag, continents, population }) => {
  return (
    <div className={styles.container}>
      <div className={styles.carta}>
        <h3>{name}</h3>
        <Link to={`/detail/${id}`}>
          <img src={flag} alt={name} />
        </Link>
        <p>{continents}</p>
      </div>
    </div>
  );
};

export default Card;
