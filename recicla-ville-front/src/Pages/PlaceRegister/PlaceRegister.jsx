

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import styles from "./PlaceRegister.module.css";
import "react-toastify/dist/ReactToastify.css";


const PlaceRegister = () => {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    endereco: {
      cep: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      localidade: "",
      uf: "",
    },
    coordenadas: {
      latitude: 0,
      longitude: 0,
    },
    residuos: [],
  });

  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const tiposResiduos = ["Vidro", "Metal", "Papel", "Plástico", "Orgânico"];

  const buscarCep = async () => {
    if (!formData.endereco.cep || formData.endereco.cep.length < 8) {
      toast.error("CEP inválido");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/cep/${formData.endereco.cep}`
      );
      const data = await response.json();

      if (data.erro) {
        toast.error("CEP não encontrado");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          logradouro: data.logradouro || "",
          bairro: data.bairro || "",
          localidade: data.localidade || "",
          uf: data.uf || "",
        },
        coordenadas: {
          latitude: data.coordenada?.latitude || 0,
          longitude: data.coordenada?.longitude || 0,
        },
      }));
    } catch (err) {
      toast.error("Erro ao buscar CEP");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("endereco.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          [field]: value,
        },
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResiduosChange = (tipo) => {
    setFormData((prev) => {
      const newResiduos = prev.residuos.includes(tipo)
        ? prev.residuos.filter((r) => r !== tipo)
        : [...prev.residuos, tipo];

      return {
        ...prev,
        residuos: newResiduos,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const usuarioId = localStorage.getItem("usuarioId");

      if (!usuarioId) {
        toast.error("Usuário não autenticado");
        setLoading(false);
        return;
      }

      if (!formData.nome) {
        toast.error("Nome do local é obrigatório");
        setLoading(false);
        return;
      }

      if (!formData.endereco.cep) {
        toast.error("CEP é obrigatório");
        setLoading(false);
        return;
      }

      if (formData.residuos.length === 0) {
        toast.error("Selecione pelo menos um tipo de resíduo");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:3000/coletas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          usuarioid: usuarioId,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.erro || "Erro ao cadastrar local");
        setLoading(false);
        return;
      }

      setIsSubmitted(true);
      toast.success("Local cadastrado com sucesso!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      window.scrollTo({ top: 0, behavior: "smooth" });

      setFormData({
        nome: "",
        descricao: "",
        endereco: {
          cep: "",
          logradouro: "",
          numero: "",
          complemento: "",
          bairro: "",
          localidade: "",
          uf: "",
        },
        coordenadas: {
          latitude: 0,
          longitude: 0,
        },
        residuos: [],
      });
    } catch (err) {
      toast.error("Erro na conexão com o servidor");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.container}>
      <ToastContainer />

      <h1 className={styles.title}>Cadastro de Local de Coleta</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="nome">Nome do Local*</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            disabled={isSubmitted}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            rows="4"
            disabled={isSubmitted}
          />
        </div>

        <div className={styles.addressSection}>
          <h2>Endereço</h2>

          <div className={styles.cepGroup}>
            <div className={styles.formGroup}>
              <label htmlFor="cep">CEP*</label>
              <input
                type="text"
                id="cep"
                name="endereco.cep"
                value={formData.endereco.cep}
                onChange={handleChange}
                maxLength={9}
                onBlur={buscarCep}
                required
                disabled={isSubmitted}
              />
            </div>

            <button
              type="button"
              onClick={buscarCep}
              className={styles.cepButton}
              disabled={loading || isSubmitted}
            >
              {loading ? "Buscando..." : "Buscar CEP"}
            </button>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="logradouro">Logradouro</label>
            <input
              type="text"
              id="logradouro"
              name="endereco.logradouro"
              value={formData.endereco.logradouro}
              onChange={handleChange}
              readOnly
              disabled={isSubmitted}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="numero">Número</label>
              <input
                type="text"
                id="numero"
                name="endereco.numero"
                value={formData.endereco.numero}
                onChange={handleChange}
                disabled={isSubmitted}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="complemento">Complemento</label>
              <input
                type="text"
                id="complemento"
                name="endereco.complemento"
                value={formData.endereco.complemento}
                onChange={handleChange}
                disabled={isSubmitted}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="bairro">Bairro</label>
            <input
              type="text"
              id="bairro"
              name="endereco.bairro"
              value={formData.endereco.bairro}
              onChange={handleChange}
              readOnly
              disabled={isSubmitted}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="localidade">Cidade</label>
              <input
                type="text"
                id="localidade"
                name="endereco.localidade"
                value={formData.endereco.localidade}
                onChange={handleChange}
                readOnly
                disabled={isSubmitted}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="uf">Estado</label>
              <input
                type="text"
                id="uf"
                name="endereco.uf"
                value={formData.endereco.uf}
                onChange={handleChange}
                readOnly
                style={{ width: "50px" }}
                disabled={isSubmitted}
              />
            </div>
          </div>

          <div className={styles.coordinates}>
            <span>Latitude: {formData.coordenadas.latitude.toFixed(6)}</span>
            <span>Longitude: {formData.coordenadas.longitude.toFixed(6)}</span>
          </div>
        </div>

        <div className={styles.wasteSection}>
          <h2>Tipos de Resíduos Aceitos*</h2>
          <div className={styles.wasteOptions}>
            {tiposResiduos.map((tipo) => (
              <label key={tipo} className={styles.wasteOption}>
                <input
                  type="checkbox"
                  checked={formData.residuos.includes(tipo)}
                  onChange={() => handleResiduosChange(tipo)}
                  disabled={isSubmitted}
                />
                {tipo}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.formActions}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading || isSubmitted}
          >
            {loading ? "Cadastrando..." : "Cadastrar Local"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaceRegister;
