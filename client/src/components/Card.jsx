import { Link, NavLink } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ id, name, flag, continents}) => {
  return (
    <div className={styles.container}>
      <div className={styles.carta}>
        <h3>{name}</h3>
        <Link to={`/detail/${id}`}>
          <img src={flag} alt={name} />
        </Link>
        <h3>{continents}</h3>
      </div>

    </div>
  );
};

export default Card;
