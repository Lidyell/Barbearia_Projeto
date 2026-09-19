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

## 🧩 Arquitetura do Projeto

A aplicação segue uma organização baseada na separação entre **componentes reutilizáveis**, **páginas**, **rotas** e **recursos estáticos**.

### `public/`

Contém arquivos estáticos disponibilizados diretamente pela aplicação.

O diretório `public/image/` armazena imagens utilizadas como backgrounds e outros elementos visuais da interface.

---

### `src/components/`

Contém componentes React reutilizáveis e independentes.

Cada componente possui, quando necessário, seu próprio arquivo `.tsx` e `.css`.

#### `Cards/`

Exibe os principais serviços oferecidos pela barbearia, incluindo informações como:

* Corte de cabelo
* Barba
* Sobrancelha
* Platinado
* Valores dos serviços

#### `Footer/`

Responsável pelo rodapé da aplicação, contendo informações como:

* Endereço
* Telefone
* E-mail
* Direitos reservados

#### `Introduction/`

Seção principal de apresentação da barbearia.

Inclui:

* Apresentação do estabelecimento
* Botão de ação para agendamento
* Mapa do Google Maps incorporado

#### `LoadingScreen/`

Tela de carregamento inicial exibida durante a abertura da aplicação.

Possui animações e funciona como uma splash screen da página inicial.

#### `Navbar/`

Barra de navegação principal da aplicação.

Possui:

* Navegação entre páginas
* Menu responsivo
* Menu hamburger para dispositivos móveis
* Animações utilizando `hamburger-react`

#### `ScrollToTop/`

Componente responsável pelo botão flutuante que permite retornar rapidamente ao topo da página.

Utiliza ícones da biblioteca `react-icons`.

---

## 📄 Páginas

As páginas ficam organizadas dentro de `src/pages/` e representam as principais telas da aplicação.

### `Home/`

Página inicial da aplicação.

Agrupa:

* Tela de carregamento
* Seção de introdução
* Apresentação dos serviços
* Cards da barbearia

---

### `Agenda/`

Tela responsável pelo sistema de agendamento.

Permite ao cliente:

* Escolher o profissional
* Selecionar o serviço
* Escolher o dia
* Selecionar o horário disponível

O sistema também realiza tratamento dos dias de atendimento, não permitindo agendamentos aos domingos.

---

### `Cadastro/`

Página responsável pela criação de novas contas.

Os dados cadastrados são enviados para a API externa desenvolvida em Java + Spring Boot.

Endpoint utilizado:

```text
POST /usuario
```

API:

```text
https://api-cadastro-dqny.onrender.com/usuario
```

---

### `Login/`

Página responsável pela autenticação dos usuários.

Após a validação das credenciais, os dados do usuário são armazenados no `localStorage`, permitindo manter a sessão durante a navegação.

Após o login, o usuário é direcionado para o painel.

---

### `Painel/`

Dashboard administrativo da aplicação.

Apresenta informações relacionadas ao funcionamento da barbearia, incluindo:

* Agendamentos do dia
* Faturamento
* Clientes atendidos
* Lista de agendamentos
* Visualização expandida de agendamentos
* Logout

---

## 🛣️ Rotas

As rotas são centralizadas em:

```text
src/routes/Routes.tsx
```

Utilizando `react-router-dom`.

| Rota        | Página   | Descrição                |
| ----------- | -------- | ------------------------ |
| `/`         | Home     | Página inicial           |
| `/agenda`   | Agenda   | Agendamento de serviços  |
| `/cadastro` | Cadastro | Criação de usuário       |
| `/login`    | Login    | Autenticação             |
| `/painel`   | Painel   | Dashboard administrativo |
| `*`         | 404      | Rota não encontrada      |

---

## ⚙️ Arquivos de Configuração

### `netlify.toml`

Configura o comportamento da aplicação durante o deploy na Netlify.

O redirecionamento:

```text
/* → /index.html
```

é utilizado para garantir o funcionamento do React Router e evitar erros `404` ao acessar ou atualizar diretamente uma rota.

---

### `vite.config.ts`

Arquivo responsável pela configuração do Vite e integração com React.

---

### `tsconfig.json`

Configuração principal do TypeScript.

---

### `tsconfig.app.json`

Configurações específicas do TypeScript para o código localizado em `src/`.

---

### `tsconfig.node.json`

Configurações do TypeScript utilizadas pelas ferramentas de desenvolvimento baseadas em Node.js, como o Vite.

---

### `eslint.config.js`

Define as regras utilizadas pelo ESLint para padronização e análise do código.

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
