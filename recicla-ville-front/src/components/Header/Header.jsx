

import { Link } from "react-router-dom";

import styles from "./Header.module.css";

const Header = () => {
  

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.displayLogo}>
          <img className={styles.Logo} src="/src/assets/imgs/login2.png" alt="Logo" />
        </div>
        <div>
          <Link to="/dashboard" className={styles.menuButton}>
            DashBoard
          </Link>
          <Link to="/places" className={styles.menuButton}>
            Locais
          </Link>
        </div>
      </div>
      <div className={styles.headerContainer}>
        <div>
          <Link to="/login" className={styles.menuButton}>
            Sair
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

