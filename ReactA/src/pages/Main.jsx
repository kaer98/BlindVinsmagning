import styles from "../css/main.module.css";
import { Link } from "react-router-dom";

export default function Main() {
  return (
    <div className="container">
      <div className={styles.main}>
        <div className={styles.text}>Main Page</div>
        <Link to="/join">
          <button>Join</button>
        </Link>
        <Link to="/createtaste">
          <button>Opret</button>
        </Link>
        <Link to="/profil">
          <button>Profil</button>
        </Link>
        <Link to="/">
          <button>Log Ud</button>
        </Link>
      </div>
    </div>
  );
}
