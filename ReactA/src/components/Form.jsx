import styles from "../css/currently.module.css";

export default function Form() {
  return (
    <form action="">
      <div className="container">
        <div className={styles.current}>
          <div className={styles.text}>Igangværende Vinsmagning</div>
          <div className={styles.stylepage}>
            <div className={styles.form}>
              <label className="h5" for="wine">
                Vælg Vin:
              </label>
              <select name="wine">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div>
              <label htmlFor="antal" className="p-2">
                Antal Vin
              </label>
              <input className="input-sm" type="text" />
            </div>
            <div className={styles.select}>
              <label for="chooseWine" className="me-2">
                Vælg!:
              </label>
              <div className={styles.selectAlign}>
                <select name="appearance">
                  <optgroup label="Appearance">
                    <option value="" selected disabled hidden>
                      Appearance Intensity
                    </option>
                    <option value="Pale">Pale</option>
                    <option value="Medium">Medium</option>
                    <option value="Deep">Deep</option>
                  </optgroup>
                </select>
                <select name="appearance">
                  <optgroup label="Appearance">
                    <option value="" selected disabled hidden>
                      Color
                    </option>
                    <option value="Lemon">Lemon</option>
                    <option value="Gold">Gold</option>
                    <option value="Amber">Amber</option>
                    <option value="Pink">Pink</option>
                    <option value="Pink-Orange">Pink-Orange</option>
                    <option value="Orange">Orange</option>
                    <option value="Purple">Purple</option>
                    <option value="Ruby">Ruby</option>
                    <option value="Garnet">Garnet</option>
                    <option value="Tawny">Tawny</option>
                  </optgroup>
                </select>
                <select name="appearance">
                  <optgroup label="Conclusion">
                    <option value="" selected disabled hidden>
                      Quality
                    </option>
                    <option value="Poor">Poor</option>
                    <option value="Acceptable">Acceptable</option>
                    <option value="Good">Good</option>
                    <option value="Very-Good">Very Good</option>
                    <option value="Outstanding">Outstanding</option>
                  </optgroup>
                </select>
                <select name="appearance">
                  <optgroup label="Nose">
                    <option value="" selected disabled hidden>
                      Smell Intensity
                    </option>
                    <option value="Light">Light</option>
                    <option value="Medium">Medium</option>
                    <option value="Pronounced">Pronounced</option>
                  </optgroup>
                </select>
                <select name="appearance">
                  <optgroup label="Palate">
                    <option value="" selected disabled hidden>
                      Alkohol
                    </option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </optgroup>
                </select>
                <select name="appearance">
                  <optgroup label="Palate">
                    <option value="" selected disabled hidden>
                      Acidity
                    </option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </optgroup>
                </select>
                <select name="appearance">
                  <optgroup label="Palate">
                    <option value="" selected disabled hidden>
                      Sweetness
                    </option>
                    <option value="Dry">Dry</option>
                    <option value="OffDry">OffDry</option>
                    <option value="Medium">Medium</option>
                    <option value="Sweet">Sweet</option>
                  </optgroup>
                </select>
                <select name="appearance">
                  <optgroup label="Palate">
                    <option value="" selected disabled hidden>
                      Tannin
                    </option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </optgroup>
                </select>
                <select name="appearance">
                  <optgroup label="Palate">
                    <option value="" selected disabled hidden>
                      Body
                    </option>
                    <option value="Light">Light</option>
                    <option value="Medium">Medium</option>
                    <option value="Full">Full</option>
                  </optgroup>
                </select>
                <select name="appearance">
                  <optgroup label="Palate">
                    <option value="" selected disabled hidden>
                      Flavour
                    </option>
                    <option value="Light">Light</option>
                    <option value="Medium">Medium</option>
                    <option value="Pronounced">Pronounced</option>
                  </optgroup>
                </select>
                <select name="appearance">
                  <optgroup label="Palate">
                    <option value="" selected disabled hidden>
                      Finish
                    </option>
                    <option value="Short">Short</option>
                    <option value="Medium">Medium</option>
                    <option value="Long">Long</option>
                  </optgroup>
                </select>
                <input className="m-3" type="submit" value="Submit" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
