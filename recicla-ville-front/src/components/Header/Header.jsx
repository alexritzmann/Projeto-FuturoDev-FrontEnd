

import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./Header.module.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className={`${styles.header} ${isMobile ? styles.hidden : ""}`}>
        <div className={styles.headerContainer}>
          <div className={styles.logoContainer}>
            <div className={styles.displayLogo}>
              <img
                className={styles.Logo}
                src="/src/assets/imgs/login2.png"
                alt="Logo"
              />
            </div>
            <h1 className={styles.projectName}>ReciclaVille</h1>
          </div>

          <div className={styles.desktopMenu}>
            <Link 
              to="/dashboard" 
              className={`${styles.menuButton} ${isActive('/dashboard') ? styles.activeButton : ''}`}
            >
              DashBoard
            </Link>
            <Link 
              to="/places" 
              className={`${styles.menuButton} ${isActive('/places') ? styles.activeButton : ''}`}
            >
              Locais
            </Link>
          </div>
        </div>

        <div className={styles.headerContainer}>
          <div className={styles.userInfo}>
            {localStorage.getItem("usuario") && (
              <span>
                Olá, {JSON.parse(localStorage.getItem("usuario")).nome}
              </span>
            )}
          </div>
          <div className={styles.desktopMenu}>
            <Link to="/login" className={styles.menuButton}>
              Sair
            </Link>
          </div>
        </div>
      </header>

      {isMobile && (
        <button
          className={`${styles.menuIcon} ${menuOpen ? styles.closeIcon : ""}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {menuOpen ? (
            <CloseIcon style={{ fontSize: "2rem" }} />
          ) : (
            <MenuIcon style={{ fontSize: "2rem" }} />
          )}
        </button>
      )}

      {menuOpen && isMobile && (
        <>
          <div className={styles.overlay} onClick={toggleMenu}></div>

          <div className={styles.mobileMenu}>
            <div className={styles.mobileLogoContainer}>
              <img
                className={styles.mobileLogo}
                src="/src/assets/imgs/login2.png"
                alt="Logo"
              />
              <h1 className={styles.mobileProjectName}>ReciclaVille</h1>
            </div>
            
            <div className={styles.userInfo}>
              {localStorage.getItem("usuario") && (
                <span>
                  Olá, {JSON.parse(localStorage.getItem("usuario")).nome}
                </span>
              )}
            </div>
            <Link
              to="/dashboard"
              className={`${styles.menuButton} ${isActive('/dashboard') ? styles.activeButton : ''}`}
              onClick={closeMenu}
            >
              DashBoard
            </Link>
            <Link
              to="/places"
              className={`${styles.menuButton} ${isActive('/places') ? styles.activeButton : ''}`}
              onClick={closeMenu}
            >
              Locais
            </Link>
            <Link to="/login" className={styles.menuButton} onClick={closeMenu}>
              Sair
            </Link>
          </div>
        </>
      )}
    </>
  );
};


export default Header;

