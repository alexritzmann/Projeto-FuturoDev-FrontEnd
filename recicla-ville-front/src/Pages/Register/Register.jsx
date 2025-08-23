

const API_BASE = import.meta.env.VITE_API_URL;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import AuthLayout from "../../components/AuthLayout/AuthLayout";

import styles from "../../components/AuthLayout/AuthLayout.module.css";
import "react-toastify/dist/ReactToastify.css";
import loginRegister from '../../assets/imgs/register.jpg';


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    cpf: "",
    birthdate: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      if (name === "password" || name === "confirmPassword") {
        setPasswordMatch(newData.password === newData.confirmPassword);
      }
      return newData;
    });
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
    setIsSubmitted(true);

    const requiredFields = [
      "name",
      "gender",
      "cpf",
      "birthdate",
      "email",
      "password",
      "confirmPassword",
    ];

    if (requiredFields.some((field) => !formData[field])) {
      setError("Por favor, preencha todos os campos obrigatórios");
      setIsSubmitted(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      setIsSubmitted(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("E-mail inválido");
      setIsSubmitted(false);
      return;
    }

    if (!validateCPF(formData.cpf)) {
      setError("CPF inválido");
      setIsSubmitted(false);
      return;
    }

    const birthDate = new Date(formData.birthdate);
    const today = new Date();
    if (birthDate >= today) {
      setError("Data de nascimento inválida");
      setIsSubmitted(false);
      return;
    }

    const ageDif = today - birthDate;
    const ageDate = new Date(ageDif);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (age < 12) {
      setError("É necessário ter pelo menos 12 anos para se cadastrar");
      setIsSubmitted(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      setIsSubmitted(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.name,
          sexo: formData.gender,
          cpf: formData.cpf.replace(/\D/g, ""),
          nascimento: formData.birthdate,
          email: formData.email,
          senha: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro || "Erro ao cadastrar usuário");
      }

      toast.success(
        "Cadastro realizado com sucesso! Redirecionando para login...",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      setIsSubmitted(false);
    }
  };

  return (
    <AuthLayout title="Criar Conta" image={loginRegister}>
      <p className={styles.welcomeMessage}>Junte-se à ReciclaVille</p>
      <ToastContainer />
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
          disabled={isLoading || isSubmitted}
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
          disabled={isLoading || isSubmitted}
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
          disabled={isLoading || isSubmitted}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="birthdate" className={styles.label}>
          Data de Nascimento: *
        </label>
        <p className={styles.ageInfo}>
          É necessário ter pelo menos 12 anos para se cadastrar
        </p>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          className={styles.input}
          disabled={isLoading || isSubmitted}
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
          disabled={isLoading || isSubmitted}
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
          disabled={isLoading || isSubmitted}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="confirmPassword" className={styles.label}>
          Confirmar Senha: *
        </label>
        <input
          autoComplete="off"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`${styles.input} ${
            !passwordMatch && formData.confirmPassword ? styles.inputError : ""
          }`}
          disabled={isLoading || isSubmitted}
        />
      </div>

      {error && <p className={styles.error}>{"Erro de comunicação: " + error + "."}</p>}

      <button
        type="submit"
        className={`${styles.button} ${
          isLoading || isSubmitted ? styles.buttonDisabled : ""
        }`}
        disabled={isLoading || isSubmitted}
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
