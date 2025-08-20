

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Card from "../../components/Card/Card";

import styles from "./Places.module.css";


const Places = () => {
  const [coletas, setColetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchColetas = async () => {
      try {
        const usuarioId = localStorage.getItem("usuarioId");
        if (!usuarioId) {
          throw new Error("Usuário não autenticado");
        }

        const response = await fetch("http://localhost:3000/coletas", {
          headers: {
            usuarioid: usuarioId,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao carregar pontos de coleta");
        }

        const data = await response.json();
        setColetas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchColetas();
  }, []);

  const handleDelete = async (id) => {
    try {
      const usuarioId = localStorage.getItem("usuarioId");
      if (!usuarioId) {
        throw new Error("Usuário não autenticado");
      }

      const response = await fetch(`http://localhost:3000/coletas/${id}`, {
        method: "DELETE",
        headers: {
          usuarioid: usuarioId,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir ponto de coleta");
      }

      setColetas(coletas.filter((coleta) => coleta.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <p>Carregando pontos de coleta...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Seus pontos de coleta</h1>
        <Link to="/placeRegister" className={styles.newButton}>
          Novo
        </Link>
      </div>

      {coletas.length === 0 ? (
        <p className={styles.emptyMessage}>Nenhum ponto de coleta cadastrado.</p>
      ) : (
        <div className={styles.cardsContainer}>
          {coletas.map((coleta) => (
            <Card 
              key={coleta.id} 
              coleta={coleta} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Places;

