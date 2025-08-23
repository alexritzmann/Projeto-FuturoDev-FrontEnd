# ♻️ Recicla Ville - FrontEnd

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-4.0-646CFF?logo=vite&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-Repo-181717?logo=github)
![License](https://img.shields.io/badge/Licença-MIT-green)

## 📝 Descrição do Projeto
O **Recicla Ville** é uma plataforma **Front-End** desenvolvida em **React** para o gerenciamento de resíduos recicláveis.  
O objetivo é **facilitar o acesso a pontos de coleta**, permitindo que os usuários:

- Cadastrem novos locais de coleta  
- Visualizem pontos existentes em um **mapa interativo**  
- Listem seus próprios pontos de coleta  
- Consultem os **materiais aceitos** em cada local  

Este projeto é a **primeira versão (MVP - Minimum Viable Product)** da aplicação, construída com foco em **usabilidade** e **experiência do usuário**.

---

## 🌟 Funcionalidades Principais
- 🔐 **Autenticação de Usuário**: Telas de Login e Cadastro com validações (email, senha, CPF e data de nascimento).  
- 🗺️ **Dashboard**: Exibe um mapa com os pontos de coleta e cards com a quantidade de pontos por estado.  
- 🏷️ **Cadastro de Pontos de Coleta**: Formulário com busca automática de endereço e coordenadas via API de CEP.  
- 📋 **Listagem de Pontos**: Tela para visualizar e deletar pontos cadastrados pelo usuário.  
- 📌 **Navegação Dinâmica**: Menu que exibe as opções de Dashboard e Locais de Coleta após o login.  

---

## 🚀 Tecnologias e Ferramentas

### 🔧 Front-end
- **React** → Biblioteca para construção da interface do usuário  
- **Vite** → Ferramenta de build rápida  
- **React Router DOM** → Gerenciamento de rotas e navegação  
- **React Leaflet** → Mapa interativo  
- **React Toastify** → Notificações para feedback  

### 📂 Versionamento
- **Git & GitHub** → Fluxo de branches para cada funcionalidade  

### ☁️ Deploy
- **Vercel** ou **Netlify** → Hospedagem e deploy contínuo  

### 🔌 Integrações (APIs)
- **api_coletas** → API local para usuários e pontos de coleta  
- **API de CEP** → Busca de endereço e coordenadas  

---

## ⚙️ Como Executar o Projeto

### ✅ Pré-requisitos
- [Node.js (LTS)](https://nodejs.org/)  
- [npm](https://www.npmjs.com/)  
- API do projeto **api_coletas** em execução  

### ▶️ Passos

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/seu-projeto.git
   cd seu-projeto

2. **Instale as dependências**
   ```bash
   npm install
   
3. **Inicie a API**
   - Certifique-se de que a API do projeto (api_coletas) está rodando
   - Normalmente, inicia-se com:
     ```bash
     npm run start

3. **Execute a aplicação**
   ```bash
   npm run dev

A aplicação será iniciada em:
👉 http://localhost:5173

📌 Status do Projeto

🚧 Em desenvolvimento (MVP) 🚧

🤝 Contribuições

Contribuições são bem-vindas!
Siga o fluxo de fork → branch → commit → pull request.

📄 Licença

Este projeto está sob a licença MIT.
Sinta-se à vontade para usar e modificar conforme necessário.
