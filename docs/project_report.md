# Relatório de Análise do Projeto: Sistema de Geração de Briefing

## 1. Visão Geral do Projeto

Este é um projeto full-stack que consiste em um "Sistema de Geração de Briefing". A aplicação permite que os usuários preencham um formulário de várias etapas para gerar um briefing detalhado. O sistema é composto por um backend em Go e um frontend em React (TypeScript).

- **Core Feature**: Geração de briefings para startups através de um formulário guiado.
- **Público-alvo**: Startups e empreendedores que precisam estruturar um briefing de projeto.
- **Fluxo do Usuário**: O usuário pode se registrar, fazer login, acessar um dashboard e usar a ferramenta para gerar um briefing.

## 2. Tecnologias Utilizadas

### Backend (Go)
- **Linguagem**: Go (versão 1.24.3)
- **Framework/Roteador**: `gorilla/mux` para roteamento de HTTP.
- **Banco de Dados**: PostgreSQL (utilizando o driver `lib/pq` e `sqlx` para facilitar as operações).
- **Autenticação**: JWT (`dgrijalva/jwt-go`).
- **Criptografia**: `golang.org/x/crypto` para hashing de senhas.
- **IA Generativa**: `google.golang.org/genai` (sugere integração com a API do Google Gemini para a geração do briefing).
- **Deployment**: Configurado para deploy na Vercel (`vercel.json`).

### Frontend (React)
- **Framework**: React (versão 18.3.1) com TypeScript.
- **Build Tool**: Vite.
- **UI Components**: `shadcn/ui`, uma coleção de componentes reutilizáveis construídos sobre Radix UI e Tailwind CSS.
- **Estilização**: Tailwind CSS.
- **Roteamento**: `react-router-dom`.
- **Gerenciamento de Estado (API)**: `@tanstack/react-query` para fetching, caching e atualização de dados.
- **Formulários**: `react-hook-form` com `zod` para validação de schema.
- **Requisições HTTP**: `axios`.

## 3. Estrutura do Projeto

O projeto está organizado em uma estrutura de monorepo com duas pastas principais:

- `backend/`: Contém toda a lógica da API, manipulação de banco de dados e configurações do servidor.
- `frontend/`: Contém a aplicação React, incluindo componentes, páginas, hooks e estilos.

## 4. Análise do Backend

### Endpoints da API (`api/main.go`)
A API expõe os seguintes endpoints:
- `POST /briefing`: Endpoint principal que recebe os dados do formulário e gera o briefing.
- `GET /users`: Retorna uma lista de usuários.
- `POST /users`: Cria um novo usuário (registro).

### Banco de Dados (`database/database.sql`)
O esquema do banco de dados define duas tabelas principais:

1.  **`Users`**: Armazena informações dos usuários.
    - `id` (SERIAL, PK)
    - `name` (VARCHAR)
    - `email` (VARCHAR, UNIQUE)
    - `password` (VARCHAR, hashed)

2.  **`BriefingHistory`**: Armazena os briefings gerados pelos usuários.
    - `id` (SERIAL, PK)
    - `briefing` (TEXT)
    - `user_id` (INTEGER, FK para `Users.id`)

## 5. Análise do Frontend

### Roteamento (`App.tsx`)
A aplicação define as seguintes rotas:
- `/`: Página inicial (`Home`).
- `/login`: Página de login do usuário.
- `/register`: Página de registro de novo usuário.
- `/dashboard`: O painel principal da aplicação (`Index`), onde o gerador de briefing provavelmente é acessado.
- `*`: Rota de fallback para uma página `NotFound`.

### Componente Principal (`BriefingGenerator.tsx`)
Este é o coração da aplicação. É um componente multi-etapas que guia o usuário através do preenchimento do briefing.

- **Etapas do Formulário**:
    1.  **Informações da startup**: Nome da empresa, setor, público-alvo.
    2.  **Problema & Solução**: Descrição do problema que a startup resolve e como ela o faz.
    3.  **Objetivos & Recursos**: Metas do projeto, prazo e orçamento.

- **Funcionalidade**:
    - Valida os campos em cada etapa antes de permitir que o usuário avance.
    - Ao final, envia os dados compilados para o endpoint `POST /briefing` do backend.
    - Exibe o resultado do briefing gerado no componente `BriefingResult`.

## 6. Próximos Passos e Recomendações

1.  **Implementar Autenticação no Frontend**: Conectar as páginas de Login/Registro com a API para obter e armazenar tokens JWT.
2.  **Proteger Rotas**: A rota `/dashboard` deve ser privada, acessível apenas por usuários autenticados.
3.  **Completar a Lógica do Backend**: A lógica no handler `GetBriefing` precisa ser implementada, possivelmente chamando a API do Google Gemini para processar os dados do formulário e gerar o texto do briefing.
4.  **Histórico de Briefings**: Criar uma nova página no dashboard para listar os briefings gerados pelo usuário, buscando os dados da tabela `BriefingHistory`.
5.  **Testes**: Adicionar testes unitários e de integração tanto para o backend quanto para o frontend para garantir a qualidade e a estabilidade do código.
