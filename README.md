# Sistema de Geração de Briefing

Este projeto é uma aplicação web full-stack projetada para ajudar startups e empreendedores a criar briefings de projeto detalhados por meio de um formulário simples e guiado.

## Features

- **Geração de Briefing Guiada**: Um formulário de várias etapas que coleta informações sobre a empresa, problema, solução, objetivos e recursos.
- **Backend Inteligente**: Utiliza Go para processar os dados e tem capacidade para se integrar a serviços de IA generativa para criar o conteúdo do briefing.
- **Dashboard de Usuário**: Área para os usuários gerenciarem seus briefings (funcionalidade futura).
- **Autenticação de Usuário**: Sistema de registro e login (em desenvolvimento).

---

## Tecnologias Utilizadas

O projeto é dividido em duas partes principais: um backend em Go e um frontend em React.

### **Backend**

- **Linguagem**: Go
- **Roteamento**: `gorilla/mux`
- **Banco de Dados**: PostgreSQL (com `lib/pq` e `sqlx`)
- **Autenticação**: JWT (`dgrijalva/jwt-go`)
- **IA**: Preparado para usar `google.golang.org/genai`

### **Frontend**

- **Framework**: React com TypeScript
- **Build Tool**: Vite
- **UI**: `shadcn/ui` e Tailwind CSS
- **Roteamento**: `react-router-dom`
- **Gerenciamento de Estado da API**: `@tanstack/react-query`
- **Formulários**: `react-hook-form` e `zod`

---

## Estrutura do Projeto

```
Briefing generation system/
├── backend/        # Aplicação Go (API)
│   ├── api/        # Handlers da API (main.go)
│   ├── src/        # Lógica de negócio, banco de dados, modelos
│   ├── go.mod
│   └── ...
├── frontend/       # Aplicação React (UI)
│   ├── src/
│   │   ├── components/ # Componentes React
│   │   ├── pages/      # Páginas da aplicação
│   │   └── App.tsx     # Roteamento principal
│   ├── package.json
│   └── ...
└── docs/           # Documentação
    └── project_report.md
```

---

## Como Começar

Siga as instruções abaixo para configurar e executar o projeto localmente.

### **Pré-requisitos**

- [Go](https://go.dev/doc/install) (versão 1.24+)
- [Node.js](https://nodejs.org/en) (versão 20+)
- [PostgreSQL](https://www.postgresql.org/download/)

### **1. Configuração do Backend**

1.  **Navegue até a pasta do backend**:
    ```sh
    cd backend
    ```

2.  **Crie o arquivo de ambiente**:
    Copie ou renomeie `.env.example` para `.env` e preencha as variáveis de ambiente, especialmente a string de conexão com o banco de dados PostgreSQL.
    ```
    DATABASE_URL="postgres://user:password@localhost:5432/BriefingGenerationSystem?sslmode=disable"
    ```

3.  **Execute o banco de dados**:
    Use o arquivo `backend/src/database/database.sql` para criar o banco de dados e as tabelas necessárias no seu servidor PostgreSQL.

4.  **Instale as dependências**:
    ```sh
    go mod tidy
    ```

5.  **Inicie o servidor**:
    ```sh
    go run api/main.go
    ```
    O servidor backend estará rodando em `http://localhost:3000`.

### **2. Configuração do Frontend**

1.  **Navegue até a pasta do frontend**:
    ```sh
    cd frontend
    ```

2.  **Instale as dependências**:
    ```sh
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento**:
    ```sh
    npm run dev
    ```
    A aplicação frontend estará acessível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

---

## Endpoints da API

A API do backend fornece os seguintes endpoints:

- `POST /briefing`: Recebe os dados do formulário e gera um briefing.
- `GET /users`: Retorna uma lista de usuários.
- `POST /users`: Cria um novo usuário.
