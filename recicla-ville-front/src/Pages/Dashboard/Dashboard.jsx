
const API_BASE = import.meta.env.VITE_API_URL;


import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { CircularProgress } from "@mui/material";

import L from "leaflet";
import CardUF from "../../components/CardUF/CardUF";

import "leaflet/dist/leaflet.css";
import styles from "./Dashboard.module.css";

// remove default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});


const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const usuarioId = localStorage.getItem("usuarioId");
        if (!usuarioId) throw new Error("Usuário não autenticado");

        const response = await fetch(`${API_BASE}/dashboard`, {
          headers: {
            usuarioid: usuarioId,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao carregar dados do dashboard");
        }

        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (!dashboardData || dashboardData.estados.length === 0) {
    return (
      <div className={styles.container}>
        <p>Nenhum ponto de coleta encontrado</p>
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
      <h1 className={styles.title}>Distribuição de pontos de coleta</h1>

      {/* Mapa com React Leaflet */}
      <div className={styles.mapContainer}>
        <MapContainer
          center={[-15.788497, -47.879873]} // Centro do Brasil
          zoom={4}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {dashboardData.locais.map((local, index) => (
            <Marker key={index} position={[local.latitude, local.longitude]}>
              <Popup>
                <strong>{local.nome}</strong>
                <br />
                {local.estado}
                <br />
                <small>{local.descricao}</small>
                <br />
                Materiais: {local.tipoMaterial}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <h2 className={styles.subtitle}>
        Distribuição dos pontos de coleta por estado
      </h2>

      <div className={styles.ufContainer}>
        {dashboardData.estados.map((estado, index) => (
          <CardUF key={index} uf={estado.nome} quantidade={estado.quantidade} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

