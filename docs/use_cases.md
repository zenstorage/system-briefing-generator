# Casos de Uso

## 1. Atores

*   **Usuário:** Indivíduo que utiliza o sistema para gerar briefings.
*   **Sistema:** A plataforma de geração de briefings.

## 2. Casos de Uso

### 2.1. Do Usuário

| Caso de Uso                | Atores   | Descrição                                                                                                                               |
| -------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **UC-001: Cadastrar-se**   | Usuário  | O usuário preenche um formulário com nome, email e senha para criar uma nova conta no sistema.                                            |
| **UC-002: Fazer Login**    | Usuário  | O usuário insere seu email e senha para acessar sua conta e ter acesso às funcionalidades do sistema.                                     |
| **UC-003: Gerar Briefing** | Usuário  | O usuário preenche um formulário com as informações necessárias para que o sistema gere um briefing de marketing.                         |
| **UC-004: Visualizar Histórico** | Usuário  | O usuário acessa uma página onde pode visualizar todos os briefings que já gerou, com a possibilidade de ver os detalhes de cada um. |
| **UC-005: Fazer Logout**   | Usuário  | O usuário encerra sua sessão no sistema.                                                                                                |

### 2.2. Do Sistema

| Caso de Uso                      | Atores   | Descrição                                                                                                                                                           |
| -------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **UC-006: Validar Dados de Cadastro** | Sistema  | O sistema verifica se os dados fornecidos no cadastro são válidos (ex: formato de email, senha forte) e se o email já não está em uso.                               |
| **UC-007: Autenticar Usuário**   | Sistema  | O sistema verifica as credenciais (email e senha) fornecidas pelo usuário e, se corretas, concede acesso à sua conta.                                                 |
| **UC-008: Processar e Gerar Briefing** | Sistema  | O sistema recebe os dados do formulário, processa as informações utilizando um modelo de IA e retorna o briefing gerado para o usuário.                             |
| **UC-009: Salvar Briefing**      | Sistema  | O sistema armazena o briefing gerado no banco de dados, associando-o à conta do usuário que o criou.                                                                  |
| **UC-010: Exibir Histórico**     | Sistema  | O sistema recupera e exibe a lista de briefings associados a um usuário específico.                                                                                   |