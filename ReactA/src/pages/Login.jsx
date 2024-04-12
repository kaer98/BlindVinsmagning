import styles from "../css/login.module.css";
import "../css/App.css";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.login}>
        <div className={styles.text}>Login Page</div>
        <Link to="/main">
          <button>Login</button>
        </Link>
        <Link to="/">
          <button>Registre</button>
        </Link>
        <Link to="/main">
          <button>Anonym</button>
        </Link>
      </div>
    </div>
  );
}
