# Matriz CSD e Desk Research

Este documento consolida as Certezas, Suposições e Dúvidas (Matriz CSD) sobre o projeto "Sistema de Geração de Briefing", além de uma análise de Desk Research baseada nos artefatos existentes.

---

## Matriz CSD

A Matriz CSD é uma ferramenta para visualizar o conhecimento e as incertezas do time sobre o projeto.

| Certezas (O que sabemos) | Suposições (O que achamos que sabemos) | Dúvidas (O que não sabemos) |
| :--- | :--- | :--- |
| 1. O projeto é um sistema full-stack (Go + React) para gerar briefings. | 1. As personas (Mariana, Carlos, Júlia, Rafael) representam fielmente nosso público-alvo. | 1. Qual é o principal canal de aquisição de usuários (Busca orgânica, indicação, anúncios)? |
| 2. A interface utiliza um formulário passo a passo (`Stepper`) para guiar o usuário. | 2. Usuários desejam e veem valor em um briefing gerado por IA em vez de um modelo estático. | 2. A "gamificação" (pontos, conquistas) realmente aumenta o engajamento e a retenção? |
| 3. A aplicação possui autenticação de usuário (Login/Cadastro). | 3. O fluxo de preenchimento em 3 etapas (Info, Problema/Solução, Objetivos) é o mais intuitivo e completo para o usuário. | 3. Qual a taxa de conversão de usuários gratuitos para os planos pagos? O preço está adequado? |
| 4. O frontend é construído com Vite, React, TypeScript e Shadcn/UI. | 4. A principal "dor" do usuário é a coleta de informações fragmentadas, como descrito na jornada. | 4. Qual é a etapa do formulário com a maior taxa de abandono? |
| 5. O backend utiliza Go, PostgreSQL e está configurado para deploy na Vercel. | 5. Clientes (como a persona Júlia) estão dispostos a preencher um formulário detalhado enviados por freelancers/agências. | 5. Como os usuários preferem compartilhar o briefing final: PDF, link compartilhável ou outro formato? |
| 6. Existe uma funcionalidade de histórico de briefings para usuários logados. | 6. A integração com Jira e a exportação em Markdown são funcionalidades decisivas para o público técnico (persona Rafael). | 6. A qualidade do texto gerado pela IA é percebida como "profissional" e "confiável" pelos usuários? |

---

## Desk Research

Esta pesquisa de escrivaninha foi conduzida analisando os documentos internos do projeto (`project_report.md`, `user_journey.md`, `wireframes.md`) para extrair insights sobre o problema, público e solução.

### 1. Problema Validado

- **A Dor Central:** A coleta de requisitos para novos projetos é um processo caótico, ineficiente e propenso a erros. As informações chegam de forma fragmentada por múltiplos canais (e-mail, WhatsApp, áudios), consumindo tempo e gerando retrabalho.
- **Consequências:** Atrasos no início dos projetos, escopo mal definido, desalinhamento de expectativas e prejuízo financeiro/reputacional.
- **Evidência:** A jornada de usuário das personas Mariana (freelancer) e Carlos (dono de agência) detalha vividamente essa dor como o principal motivador para buscar uma solução.

### 2. Público-Alvo e Segmentação

O sistema atende a múltiplos segmentos com necessidades complementares:

- **Freelancers (Persona: Mariana):** Buscam profissionalizar e agilizar o onboarding de clientes. Valorizam a eficiência e a clareza para evitar retrabalho.
- **Agências (Persona: Carlos):** Focam em padronização, escalabilidade e gestão de equipe. Necessitam de templates, marca branca e controle sobre o processo.
- **Clientes Finais/Empreendedores (Persona: Júlia):** Têm a visão do negócio, mas dificuldade em traduzi-la em requisitos técnicos. Precisam de um guia que os ajude a estruturar suas ideias.
- **Times de Tecnologia (Persona: Rafael):** Sofrem com demandas vagas de stakeholders. Buscam forçar a especificação de requisitos antes do desenvolvimento, valorizando integrações com ferramentas como Jira.

### 3. Análise de "Concorrentes" (Implícita)

Os documentos não citam concorrentes diretos, mas deixam claro que a solução compete com **ferramentas genéricas adaptadas**:

- **Google Docs/Notion:** Usados para criar documentos de briefing manualmente. A desvantagem é a falta de um fluxo guiado e padronização.
- **E-mail e WhatsApp:** Canais de comunicação onde as informações se perdem. São o epicentro do problema que o BriefGen se propõe a resolver.
- **Typeform/Google Forms:** Permitem criar formulários, mas sem a lógica de IA, templates especializados, e o fluxo de gestão pós-preenchimento (histórico, compartilhamento, etc.).

A oportunidade do BriefGen está em ser uma **ferramenta especialista**, verticalizada para o problema de briefing, enquanto os concorrentes são generalistas.

### 4. Proposta de Valor e Tendências de Mercado

- **Proposta de Valor Principal:** "Padronize a coleta de requisitos e gere briefings profissionais com IA, economizando tempo e garantindo o alinhamento do projeto desde o início."
- **Tendências de Mercado Aproveitadas:**
    - **Automação com IA:** O uso de IA para gerar o documento final é o principal diferencial tecnológico.
    - **"Product-Led Growth" (PLG):** O fluxo que permite a um cliente (Júlia) usar a ferramenta sem cadastro e depois se tornar um usuário é uma tática clássica de PLG.
    - **Verticalização de SaaS:** Foco em resolver um problema específico (briefing) para um nicho claro (profissionais criativos/técnicos), em vez de ser uma ferramenta genérica de produtividade.
