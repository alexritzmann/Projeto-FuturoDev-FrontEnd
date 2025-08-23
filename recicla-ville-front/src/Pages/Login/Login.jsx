
const API_BASE = import.meta.env.VITE_API_URL;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../components/AuthLayout/AuthLayout";

import styles from "../../components/AuthLayout/AuthLayout.module.css";
import loginImage from '../../assets/imgs/login2.png';


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

  const handleSubmit = async (e) => {
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

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          senha: credentials.password,
        }),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Resposta não-JSON:', text.substring(0, 100));
        throw new Error("Erro de comunicação com o servidor");
      }


      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro || "Erro ao fazer login");
      }

      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      localStorage.setItem("usuarioId", data.usuario.id);

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    <AuthLayout title="Login" image={loginImage}>
      <p className={styles.welcomeMessage}>Bem-vindo à ReciclaVille</p>
      
      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>
          E-mail:
        </label>
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
        <label htmlFor="password" className={styles.label}>
          Senha:
        </label>
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

      <div>
        <Link to="/register" className={styles.buttonRegister}>
          Criar conta
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Login;

