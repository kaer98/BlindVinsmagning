import styles from "../css/joinsession.module.css";
import { Link } from "react-router-dom";

export default function JoinSession() {
  return (
    <div className="container">
      <div className={styles.join}>
        <div className="fs-5 martop">Deltag i Vinsmagning</div>
        <div className="fs-6 mar">Indtast Pinkode:</div>
        <div>
          <input type="text" className="" />
        </div>
        <div>
          <p className="martop">eller scan med QR kode:</p>
        </div>
        <div className="mar">KAMERA</div>
        <div>
          <Link to="/current">
            <button>Join</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
