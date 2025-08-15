

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/AuthLayout/AuthLayout";
import styles from "../../components/AuthLayout/AuthLayout.module.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!credentials.email || !credentials.password) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
      setError("E-mail inválido");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      console.log("Credenciais enviadas:", credentials);
      alert("Login realizado com sucesso! (Simulação)");
    }, 1500);
  };

  return (
    <AuthLayout title="Login" image="/src/assets/imgs/login2.png">
      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>E-mail:</label>
        <input
          placeholder="Informe seu e-mail"
          type="text"
          id="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          className={styles.input}
          disabled={isLoading}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>Senha:</label>
        <input
          autoComplete="off"
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          className={styles.input}
          disabled={isLoading}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button
        type="submit"
        className={`${styles.button} ${isLoading ? styles.buttonDisabled : ""}`}
        disabled={isLoading}
        onClick={handleSubmit}
      >
        {isLoading ? "Carregando..." : "Entrar"}
      </button>
      
      <button
        className={styles.buttonRegister}
        onClick={() => navigate("/register")}
      >
        Criar conta
      </button>
    </AuthLayout>
  );
};

export default Login;

