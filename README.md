# 💈 Barbearia Castelo Branco

Projeto web moderno desenvolvido para gerenciamento e agendamento de serviços de uma barbearia. A aplicação oferece uma interface elegante, responsiva e organizada, proporcionando uma experiência intuitiva para clientes e administradores.

---

## ⚠️ Observação

Este projeto foi desenvolvido exclusivamente para fins de aprendizado e prática de novas tecnologias, não possuindo finalidade comercial ou objetivo financeiro.

---

## 🔗 Link do Projeto

https://barbeariacariri.netlify.app/

---

## 🚀 Funcionalidades

* 📅 Agendamento de serviços, profissionais e horários
* 👤 Sistema de login e cadastro de usuários
* 📊 Painel administrativo com métricas e agendamentos
* 📍 Integração com Google Maps para localização da barbearia
* 📱 Layout totalmente responsivo
* 🔝 Botão de voltar ao topo (Scroll to Top)
* ⏳ Tela de carregamento inicial
* 🎯 Interface moderna e intuitiva
* 🔐 Armazenamento local de sessão do usuário
* 🌐 Integração com API REST desenvolvida em Java + Spring Boot

---

## 🛠️ Tecnologias Utilizadas

### Frontend

* React
* TypeScript
* Vite
* CSS3
* React Router DOM
* React Icons
* hamburger-react

### Backend

* Java
* Spring Boot
* API REST

### Banco de Dados

* Supabase
* PostgreSQL

### Deploy

* Netlify — Frontend
* Render — API

---

## 📂 Estrutura do Projeto

```text
Barbearia_Cariri/
│
├── public/                         # Arquivos estáticos públicos
│   └── image/                      # Imagens e ilustrações
│       ├── image1.jpg
│       ├── image2.avif
│       └── images.jpg
│
├── src/                            # Código-fonte da aplicação
│   │
│   ├── assets/                     # Recursos importados pelo código
│   │   └── fonts/                  # Fontes personalizadas
│   │       └── PlaywriteNO-VariableFont_wght.ttf
│   │
│   ├── components/                 # Componentes React reutilizáveis
│   │   │
│   │   ├── Cards/                  # Serviços e valores
│   │   │   ├── Cards.css
│   │   │   └── Cards.tsx
│   │   │
│   │   ├── Footer/                 # Rodapé e informações de contato
│   │   │   ├── Footer.css
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── Introduction/           # Apresentação, mapa e CTA
│   │   │   ├── Introduction.css
│   │   │   └── Introduction.tsx
│   │   │
│   │   ├── LoadingScreen/           # Tela de carregamento inicial
│   │   │   ├── LoadingScreen.css
│   │   │   └── LoadingScreen.tsx
│   │   │
│   │   ├── Navbar/                 # Barra de navegação responsiva
│   │   │   ├── Navbar.css
│   │   │   └── Navbar.tsx
│   │   │
│   │   └── ScrollToTop/             # Botão de retorno ao topo
│   │       ├── ScrollToTop.css
│   │       └── ScrollToTop.tsx
│   │
│   ├── pages/                      # Páginas da aplicação
│   │   │
│   │   ├── Agenda/                 # Tela de agendamento
│   │   │   ├── Agenda.css
│   │   │   └── Agenda.tsx
│   │   │
│   │   ├── Cadastro/               # Cadastro de usuários
│   │   │   ├── Cadastro.css
│   │   │   └── Cadastro.tsx
│   │   │
│   │   ├── Home/                   # Página inicial
│   │   │   └── Home.tsx
│   │   │
│   │   ├── Login/                  # Autenticação
│   │   │   ├── Login.css
│   │   │   └── Login.tsx
│   │   │
│   │   └── Painel/                 # Dashboard administrativo
│   │       ├── Painel.css
│   │       └── Painel.tsx
│   │
│   ├── routes/                     # Configuração das rotas
│   │   └── Routes.tsx
│   │
│   ├── App.css                     # Estilos globais
│   ├── App.tsx                     # Componente raiz
│   └── main.tsx                    # Entrada da aplicação React
│
├── .gitignore                      # Arquivos ignorados pelo Git
├── eslint.config.js                # Configuração do ESLint
├── index.html                      # HTML principal
├── netlify.toml                    # Configuração do deploy na Netlify
├── package.json                    # Dependências e scripts
├── package-lock.json               # Versões exatas das dependências
├── README.md                       # Documentação do projeto
├── tsconfig.app.json               # TypeScript da aplicação
├── tsconfig.json                   # Configuração principal do TypeScript
├── tsconfig.node.json              # TypeScript para ferramentas Node
└── vite.config.ts                  # Configuração do Vite
```

---

## ⚙️ Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Lidyell/Barbearia_Projeto.git
```

### 2. Acesse a pasta

```bash
cd Barbearia_Projeto
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute o projeto

```bash
npm run dev
```

A aplicação estará disponível no endereço fornecido pelo Vite, normalmente:

```text
http://localhost:5173
```

---

## 🏗️ Build para Produção

Para gerar a versão otimizada da aplicação:

```bash
npm run build
```

Para visualizar a versão de produção localmente:

```bash
npm run preview
```

---

## 🔗 API

O projeto possui integração com uma API REST desenvolvida utilizando **Java + Spring Boot**.

### Repositório

https://github.com/Lidyell/API_BARBEARIA

### Tecnologias da API

* Java
* Spring Boot
* PostgreSQL
* Supabase

---

## 🌐 Deploy

O frontend está hospedado na **Netlify**.

🔗 https://barbeariacariri.netlify.app/

---

## 🎨 Design

A interface foi desenvolvida seguindo uma proposta visual moderna e premium.

Características:

* 🌑 Tema escuro
* 🟡 Paleta em preto e dourado
* ✨ Visual moderno
* 🔤 Tipografia personalizada
* 🎞️ Animações e transições
* 📱 Design responsivo
* 🧭 Navegação adaptada para dispositivos móveis

---

## 📌 Próximas Melhorias

* 🔗 Expandir a integração com o backend em Spring Boot
* 🗄️ Implementar persistência completa dos agendamentos
* 📆 Desenvolver calendário interativo
* 📲 Integrar sistema de agendamento com WhatsApp
* 📊 Expandir o painel administrativo
* 📅 Implementar gerenciamento completo de horários
* 🔐 Aprimorar autenticação e controle de acesso

---

## 👨‍💻 Autor

Desenvolvido por **Lidyell Rocha**
