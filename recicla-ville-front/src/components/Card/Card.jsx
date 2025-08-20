
import PlaceIcon from '@mui/icons-material/Place';
import RecyclingIcon from '@mui/icons-material/Recycling';

import styles from "../../Pages/Places/Places.module.css";

const Card = ({ coleta, onDelete }) => {
  const endereco = coleta.endereco;
  const enderecoFormatado = `${endereco.logradouro}, ${endereco.numero || 'S/N'} - ${endereco.bairro}, ${endereco.localidade} - ${endereco.uf}`;

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{coleta.nome}</h3>
        
        <div className={styles.cardInfoRow}>
          <PlaceIcon className={styles.icon} />
          <p className={styles.cardAddress}>{enderecoFormatado}</p>
        </div>
        
        <div className={styles.cardInfoRow}>
          <RecyclingIcon className={styles.icon} />
          <p className={styles.cardMaterials}>
            <strong>Materiais:</strong> {coleta.residuos.join(', ')}
          </p>
        </div>
      </div>
      <div className={styles.cardActions}>
        <button 
          className={styles.deleteButton} 
          onClick={() => onDelete(coleta.id)}
          aria-label="Excluir ponto de coleta"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default Card;


