import { useState } from "react";
import styles from "./PlaceRegister.module.css";

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
      uf: ""
    },
    coordenadas: {
      latitude: 0,
      longitude: 0
    },
    residuos: []
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Tipos de resíduos disponíveis
  const tiposResiduos = ["Vidro", "Metal", "Papel", "Plástico", "Orgânico"];

  // Busca CEP na API
  const buscarCep = async () => {
    if (!formData.endereco.cep || formData.endereco.cep.length < 8) {
      setError("CEP inválido");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/cep/${formData.endereco.cep}`);
      const data = await response.json();
      
      if (data.erro) {
        setError("CEP não encontrado");
        return;
      }

      setFormData(prev => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          logradouro: data.logradouro || "",
          bairro: data.bairro || "",
          localidade: data.localidade || "",
          uf: data.uf || ""
        },
        coordenadas: {
          latitude: data.coordenada?.latitude || 0,
          longitude: data.coordenada?.longitude || 0
        }
      }));
      
      setError("");
    } catch (err) {
      setError("Erro ao buscar CEP");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Manipula mudanças nos campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes("endereco.")) {
      const field = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          [field]: value
        }
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manipula seleção de resíduos
  const handleResiduosChange = (tipo) => {
    setFormData(prev => {
      const newResiduos = prev.residuos.includes(tipo)
        ? prev.residuos.filter(r => r !== tipo)
        : [...prev.residuos, tipo];
      
      return {
        ...prev,
        residuos: newResiduos
      };
    });
  };

  // Envia formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // Obtém usuarioid do localStorage (supondo que foi salvo após login)
      const usuarioId = localStorage.getItem("usuarioId");
      
      if (!usuarioId) {
        setError("Usuário não autenticado");
        setLoading(false);
        return;
      }

      // Validações básicas
      if (!formData.nome) {
        setError("Nome do local é obrigatório");
        return;
      }
      
      if (!formData.endereco.cep) {
        setError("CEP é obrigatório");
        return;
      }
      
      if (formData.residuos.length === 0) {
        setError("Selecione pelo menos um tipo de resíduo");
        return;
      }

      const response = await fetch("http://localhost:3000/coletas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "usuarioid": usuarioId
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.erro || "Erro ao cadastrar local");
        return;
      }

      setSuccess(true);
      // Limpa o formulário após sucesso
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
          uf: ""
        },
        coordenadas: {
          latitude: 0,
          longitude: 0
        },
        residuos: []
      });
      
      // Remove o sucesso após 3 segundos
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Erro na conexão com o servidor");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cadastro de Local de Coleta</h1>
      
      {success && (
        <div className={styles.successMessage}>
          Local cadastrado com sucesso!
        </div>
      )}
      
      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}
      
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
              />
            </div>
            
            <button 
              type="button" 
              onClick={buscarCep}
              className={styles.cepButton}
              disabled={loading}
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
              />
            </div>
          </div>
          
          <div className={styles.coordinates}>
            <span>
              Latitude: {formData.coordenadas.latitude.toFixed(6)} 
            </span>
            <span>
              Longitude: {formData.coordenadas.longitude.toFixed(6)}
            </span>
          </div>
        </div>
        
        <div className={styles.wasteSection}>
          <h2>Tipos de Resíduos Aceitos*</h2>
          <div className={styles.wasteOptions}>
            {tiposResiduos.map(tipo => (
              <label key={tipo} className={styles.wasteOption}>
                <input
                  type="checkbox"
                  checked={formData.residuos.includes(tipo)}
                  onChange={() => handleResiduosChange(tipo)}
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
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar Local"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaceRegister;

