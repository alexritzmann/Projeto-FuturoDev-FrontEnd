

import styles from "./AuthLayout.module.css";

const AuthLayout = ({ title, children }) => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.imageSide} />
        
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
