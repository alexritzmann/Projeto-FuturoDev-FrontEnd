import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./Header.module.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false);
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

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.displayLogo}>
          <img className={styles.Logo} src="/src/assets/imgs/login2.png" alt="Logo" />
        </div>
        
        {/* Menu para desktop */}
        <div className={styles.desktopMenu}>
          <Link to="/dashboard" className={styles.menuButton}>
            DashBoard
          </Link>
          <Link to="/places" className={styles.menuButton}>
            Locais
          </Link>
        </div>
      </div>
      
      <div className={styles.headerContainer}>
        {/* Menu desktop - botão Sair */}
        <div className={styles.desktopMenu}>
          <Link to="/login" className={styles.menuButton}>
            Sair
          </Link>
        </div>
        
        {/* Ícone do menu sanduíche (só aparece em mobile) */}
        {isMobile && (
          <button className={styles.menuIcon} onClick={toggleMenu} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}>
            {menuOpen ? <CloseIcon style={{ fontSize: '2rem' }} /> : <MenuIcon style={{ fontSize: '2rem' }} />}
          </button>
        )}
      </div>

      {/* Overlay e Menu móvel */}
      {menuOpen && isMobile && (
        <>
          <div className={styles.overlay} onClick={toggleMenu}></div>
          <div className={styles.mobileMenu}>
            <Link 
              to="/dashboard" 
              className={styles.menuButton}
              onClick={closeMenu}
            >
              DashBoard
            </Link>
            <Link 
              to="/places" 
              className={styles.menuButton}
              onClick={closeMenu}
            >
              Locais
            </Link>
            <Link 
              to="/login" 
              className={styles.menuButton}
              onClick={closeMenu}
            >
              Sair
            </Link>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;

