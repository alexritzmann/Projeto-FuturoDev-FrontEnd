

import styles from "./AuthLayout.module.css";


const AuthLayout = ({ title, children, image }) => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <img src={image} alt="Imagem" className={styles.imageSide} />
        <div className={styles.formSide}>
          <div className={styles.formContainer}>
            <form className={styles.form}>
              <h2 className={styles.title}>{title}</h2>
              {children}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

