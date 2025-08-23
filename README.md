ReciclaVille - Frontend
📋 Introdução
O ReciclaVille é uma plataforma inovadora que facilita o gerenciamento de resíduos e o acesso a pontos de coleta de materiais recicláveis. Esta aplicação web permite que usuários cadastrem novos pontos de coleta, visualizem pontos existentes em um mapa interativo, gerenciem seus locais de coleta e contribuam para um meio ambiente mais sustentável.

🎯 Problema que resolve
O ReciclaVille aborda a dificuldade de encontrar e gerenciar pontos de coleta de materiais recicláveis, promovendo a conscientização ambiental e facilitando o descarte correto de resíduos. A plataforma conecta pessoas que desejam reciclar com locais adequados para isso, incentivando práticas sustentáveis.

🛠️ Técnicas e tecnologias utilizadas
Principais tecnologias:
React - Biblioteca JavaScript para construção de interfaces

React Router DOM - Roteamento para aplicação single-page

React Leaflet - Componentes para mapas interativos

Material-UI - Componentes de UI e ícones

React Toastify - Notificações toast

CSS Modules - Estilização modularizada

Funcionalidades implementadas:
Autenticação de usuários (login e cadastro)

Cadastro e gerenciamento de pontos de coleta

Integração com API de CEP para preenchimento automático de endereços

Mapa interativo com localização de todos os pontos de coleta

Dashboard com estatísticas de pontos por estado

Design responsivo para diferentes tamanhos de tela

Validações de formulários no client-side

🚀 Como executar
Pré-requisitos:
Node.js (versão 16 ou superior)

npm ou yarn

API backend em execução (disponível em github.com/FuturoDEV-Joinville-V1/api_coletas)

Passos para execução:
Clone o repositório:

bash
git clone <url-do-repositorio>
cd reciclaville-frontend
Instale as dependências:

bash
npm install
Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto com:

text
VITE_API_URL=http://localhost:3000
Execute a aplicação:

bash
npm run dev
Acesse a aplicação no navegador:

text
http://localhost:5173
📁 Estrutura do projeto
text
src/
├── components/          # Componentes reutilizáveis
│   ├── AuthLayout/     # Layout para páginas de autenticação
│   ├── Card/           # Card para exibir pontos de coleta
│   ├── CardUF/         # Card para estatísticas por estado
│   └── Header/         # Cabeçalho com navegação
├── Pages/              # Páginas da aplicação
│   ├── Dashboard/      # Dashboard com mapa e estatísticas
│   ├── Login/          # Página de login
│   ├── Register/       # Página de cadastro de usuário
│   ├── Places/         # Listagem de pontos de coleta
│   └── PlaceRegister/  # Cadastro de novos pontos de coleta
├── assets/             # Recursos estáticos (imagens, etc.)
└── App.jsx             # Componente principal da aplicação
🔧 Funcionalidades implementadas
Autenticação
Login com e-mail e senha

Cadastro de novos usuários com validações completas

Persistência de sessão com localStorage

Pontos de Coleta
Listagem dos pontos de coleta do usuário

Cadastro de novos pontos com integração de CEP

Exclusão de pontos de coleta

Visualização em cards informativos

Dashboard
Mapa interativo com todos os pontos de coleta

Estatísticas de pontos por estado

Visualização de detalhes ao clicar nos marcadores do mapa

Interface
Design responsivo para mobile e desktop

Menu de navegação adaptável

Formulários com validações e feedback visual

Notificações toast para ações do usuário
