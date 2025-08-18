
import { useEffect } from "react";

import styles from "./Dashboard.module.css";

const Dashboard = () => {
  useEffect(() => {

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    console.log("Usuário logado:", usuario);
  }, []);

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
