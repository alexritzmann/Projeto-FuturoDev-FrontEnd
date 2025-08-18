

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import AuthLayout from "../../components/AuthLayout/AuthLayout";

import styles from "../../components/AuthLayout/AuthLayout.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    cpf: "",
    birthdate: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatCPF = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.substring(0, 11);

    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    setFormData((prev) => ({
      ...prev,
      cpf: value,
    }));
  };

  const validateCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rest = sum % 11;
    let digit1 = rest < 2 ? 0 : 11 - rest;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rest = sum % 11;
    let digit2 = rest < 2 ? 0 : 11 - rest;

    return (
      digit1 === parseInt(cpf.charAt(9)) && digit2 === parseInt(cpf.charAt(10))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const requiredFields = [
      "name",
      "gender",
      "cpf",
      "birthdate",
      "email",
      "password",
    ];

    if (requiredFields.some((field) => !formData[field])) {
      setError("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("E-mail inválido");
      return;
    }

    if (!validateCPF(formData.cpf)) {
      setError("CPF inválido");
      return;
    }

    const birthDate = new Date(formData.birthdate);
    const today = new Date();
    if (birthDate >= today) {
      setError("Data de nascimento inválida");
      return;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.name,
          sexo: formData.gender,
          cpf: formData.cpf.replace(/\D/g, ""), // Remove formatação
          nascimento: formData.birthdate,
          email: formData.email,
          senha: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro || "Erro ao cadastrar usuário");
      }

      // Cadastro bem-sucedido, redireciona para login
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <AuthLayout title="Criar Conta" image="/src/assets/imgs/register.jpg">
      <div className={styles.inputGroup}>
        <label htmlFor="name" className={styles.label}>
          Nome Completo: *
        </label>
        <input
          placeholder="Informe seu nome completo"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          disabled={isLoading}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="gender" className={styles.label}>
          Sexo: *
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className={styles.input}
          disabled={isLoading}
        >
          <option value="">Selecione</option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
          <option value="O">Outro</option>
          <option value="N">Prefiro não informar</option>
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="cpf" className={styles.label}>
          CPF: *
        </label>
        <input
          placeholder="000.000.000-00"
          type="text"
          id="cpf"
          name="cpf"
          value={formData.cpf}
          onChange={formatCPF}
          className={styles.input}
          disabled={isLoading}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="birthdate" className={styles.label}>
          Data de Nascimento: *
        </label>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          className={styles.input}
          disabled={isLoading}
          max={new Date().toISOString().split("T")[0]}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>
          E-mail: *
        </label>
        <input
          placeholder="Informe seu e-mail"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          disabled={isLoading}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>
          Senha: *
        </label>
        <input
          autoComplete="off"
          type="password"
          id="password"
          name="password"
          value={formData.password}
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
        {isLoading ? "Carregando..." : "Cadastrar"}
      </button>

      <div>
        <Link to="/login" className={styles.buttonRegister}>
          Já tem uma conta? Faça login
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Register;
