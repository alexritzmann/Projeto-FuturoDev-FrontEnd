

import styles from './CardUF.module.css';


const CardUF = ({ uf, quantidade }) => {
  return (
    <div className={styles.card}>
      <div className={styles.uf}>{uf}</div>
      <div className={styles.quantidade}>{quantidade}</div>
      <div className={styles.label}>pontos</div>
    </div>
  );
};

export default CardUF;

