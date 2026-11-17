# 📁 Estrutura de Pastas do Projeto - Barbearia Castelo Branco

Documento de referência contendo o mapeamento detalhado da arquitetura de pastas e arquivos da aplicação para documentação e inclusão no `README.md`.

---

## 🌳 Árvore de Diretórios

```plaintext
Barbearia_Cariri/
├── public/                     # Arquivos estáticos públicos servidos diretamente
│   └── image/                  # Imagens estáticas e ilustrações (background, etc.)
│       ├── image1.jpg
│       ├── image2.avif
│       └── images.jpg
│
├── src/                        # Código-fonte principal da aplicação
│   ├── assets/                 # Recursos estáticos importados pelo código
│   │   └── fonts/              # Fontes locais personalizadas
│   │       └── PlaywriteNO-VariableFont_wght.ttf
│   │
│   ├── components/             # Componentes React reutilizáveis e modulares
│   │   ├── Cards/              # Seção e cards de exibição de serviços e valores
│   │   │   ├── Cards.css
│   │   │   └── Cards.tsx
│   │   ├── Footer/             # Rodapé com dados de contato, endereço e créditos
│   │   │   ├── Footer.css
│   │   │   └── Footer.tsx
│   │   ├── Introduction/       # Banner de boas-vindas com botão de ação e mapa (Google Maps)
│   │   │   ├── Introduction.css
│   │   │   └── Introduction.tsx
│   │   ├── LoadingScreen/      # Tela de carregamento/splash inicial animada
│   │   │   ├── LoadingScreen.css
│   │   │   └── LoadingScreen.tsx
│   │   ├── Navbar/             # Barra de navegação com menu responsivo (mobile hamburger)
│   │   │   ├── Navbar.css
│   │   │   └── Navbar.tsx
│   │   └── ScrollToTop/        # Botão flutuante para rolagem suave de volta ao topo
│   │       ├── ScrollToTop.css
│   │       └── ScrollToTop.tsx
│   │
│   ├── pages/                  # Páginas / Telas da aplicação (roteadas)
│   │   ├── Agenda/             # Tela de agendamento de serviços, profissionais e horários
│   │   │   ├── Agenda.css
│   │   │   └── Agenda.tsx
│   │   ├── Cadastro/           # Formulário de criação de conta de usuário (integração via API)
│   │   │   ├── Cadastro.css
│   │   │   └── Cadastro.tsx
│   │   ├── Home/               # Página inicial agregando introdução e vitrine de serviços
│   │   │   └── Home.tsx
│   │   ├── Login/              # Tela de login e autenticação com armazenamento local de sessão
│   │   │   ├── Login.css
│   │   │   └── Login.tsx
│   │   └── Painel/             # Dashboard administrativo protegido com métricas e agendamentos
│   │       ├── Painel.css
│   │       └── Painel.tsx
│   │
│   ├── routes/                 # Configuração central de rotas da aplicação
│   │   └── Routes.tsx          # Definição das rotas com React Router
│   │
│   ├── App.css                 # Estilos globais, variáveis CSS (cores, tipografia) e scrollbar
│   ├── App.tsx                 # Componente raiz que encapsula rotas, navbar e footer
│   └── main.tsx                # Ponto de entrada do React e inicialização do DOM
│
├── .gitignore                  # Arquivos e diretórios ignorados pelo Git
├── eslint.config.js            # Configurações de padronização e linting de código
├── index.html                  # Arquivo HTML principal que carrega a aplicação
├── netlify.toml                # Configuração de redirecionamento SPA para deploy na Netlify
├── package.json                # Dependências, scripts e metadados do projeto
├── package-lock.json           # Travamento exato das versões das dependências instaladas
├── README.md                   # Documentação principal do projeto
├── tsconfig.app.json           # Configuração do TypeScript para o código da aplicação (src)
├── tsconfig.json               # Configuração raiz de referência do TypeScript
├── tsconfig.node.json          # Configuração do TypeScript para ferramentas de build (Vite/Node)
└── vite.config.ts              # Arquivo de configuração e plugins do Vite
```

---

## 📋 Detalhamento dos Módulos e Pastas

### 1. `public/`

Contém os ativos públicos que não passam pelo empacotador de módulos do Vite. O diretório `public/image/` armazena imagens de alta resolução utilizadas no plano de fundo da aplicação e elementos visuais estáticos.

### 2. `src/components/`

Componentes isolados e reutilizáveis organizados no padrão de pasta dedicada (`Componente.tsx` + `Componente.css`):

- **Cards**: Apresenta os serviços de barbearia (cabelo, barba, sobrancelha, platinado) acompanhados dos valores.
- **Footer**: Rodapé com endereço físico no Cariri, telefone, e-mail e direitos reservados.
- **Introduction**: Seção de apresentação principal com mapa do Google Maps embutido (iframe) e atalho para agendamento.
- **LoadingScreen**: Animação de tela inicial de abertura exibida durante o primeiro carregamento da Home.
- **Navbar**: Cabeçalho de navegação com menu interativo animado para dispositivos móveis (`hamburger-react`).
- **ScrollToTop**: Botão com ícone (`react-icons`) que aparece ao rolar a página para facilitar o retorno ao topo.

### 3. `src/pages/`

Telas que representam as principais visões da aplicação:

- **Home**: Agrupa os blocos de introdução e cards de serviço sob o controle da tela de carregamento.
- **Agenda**: Permite ao cliente escolher barbeiro, serviço e selecionar dinamicamente dias (exceto domingos) e horários de atendimento.
- **Cadastro**: Envia os dados de cadastro para a API externa hospedada no Render (`https://api-cadastro-dqny.onrender.com/usuario`).
- **Login**: Realiza login com validação de credenciais e salva o usuário no `localStorage`, redirecionando para o painel.
- **Painel**: Área administrativa com métricas em tempo real (agendamentos do dia, faturamento e clientes atendidos), lista detalhada de agendamentos com filtro "Ver mais/Ver menos" e opção de logout.

### 4. `src/routes/`

Centraliza o mapeamento de URLs usando o `react-router-dom`:

- `/` -> Página Home
- `/agenda` -> Página de Agendamento
- `/cadastro` -> Página de Cadastro
- `/login` -> Página de Login
- `/painel` -> Painel de Controle (protegido)
- `*` -> Tratamento de rota não encontrada (404)

### 5. Arquivos de Configuração da Raiz

- **`netlify.toml`**: Regras de redirect `/* -> /index.html` essenciais para funcionamento do roteamento no Netlify sem erro 404 ao atualizar a página.
- **`vite.config.ts`**: Configura o bundler Vite com suporte a React.
- **`tsconfig*.json`**: Configurações de tipagem estrita com TypeScript.

---

## ✂️ Modelo Pronto para Copiar no seu `README.md`

Caso queira incluir a seção de estrutura diretamente no seu `README.md`, copie o bloco abaixo:

```markdown
## 📂 Estrutura do Projeto

\`\`\`plaintext
Barbearia_Cariri/
├── public/ # Assets públicos estáticos (imagens, ícones)
│ └── image/ # Imagens de background e ilustrações
├── src/
│ ├── assets/ # Fontes locais e recursos estáticos compilados
│ ├── components/ # Componentes reutilizáveis (Navbar, Footer, Cards, etc.)
│ ├── pages/ # Páginas da aplicação (Home, Agenda, Login, Cadastro, Painel)
│ ├── routes/ # Definição e gerenciamento de rotas (React Router)
│ ├── App.css # Estilização global e variáveis do tema
│ ├── App.tsx # Componente raiz da aplicação
│ └── main.tsx # Ponto de entrada do React
├── netlify.toml # Configuração de redirecionamento para deploy
├── package.json # Dependências e scripts do projeto
├── vite.config.ts # Configurações do Vite
└── tsconfig.json # Configurações do TypeScript
\`\`\`
```
