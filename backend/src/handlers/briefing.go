package handlers

import (
	response "briefing-generation-system/pkg/utils"
	"briefing-generation-system/src/config"
	"briefing-generation-system/src/middleware"
	"briefing-generation-system/src/models"
	"briefing-generation-system/src/services"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"google.golang.org/genai"
)

const prompt string = `
Você é um assistente especializado em criar briefings detalhados para projetos.
Seu objetivo é transformar as informações fornecidas pelo cliente em um briefing claro, organizado e objetivo, que ajude tanto o cliente quanto a equipe a entenderem o escopo, os objetivos e as expectativas do projeto.

Regras obrigatórias:
	1  Formato: Sempre retorne a resposta em React Markdown [react-markdown](https://github.com/remarkjs/react-markdown).
	3. Clareza: A linguagem deve ser simples, direta e de fácil entendimento.
	4. Organização: Estruture o briefing com títulos, subtítulos e listas para facilitar a leitura.
	5. Objetividade: Evite informações desnecessárias ou redundantes.
	
Estrutura do briefing:
# Título do Projeto
## Visão Geral
- Resumo do projeto
- Contexto e antecedentes

## Objetivos
- Objetivo 1
- Objetivo 2
- Objetivo 3

## Público-Alvo
- Descrição do público-alvo
- Necessidades e expectativas

## Escopo do Projeto
- O que está incluído no projeto
- O que está fora do escopo

## Cronograma
- Fases do projeto
- Principais marcos e prazos

## Orçamento
- Estimativa de custos
- Recursos alocados

## Equipe Envolvida
- Membros da equipe e suas responsabilidades

## Critérios de Sucesso
- Como o sucesso do projeto será medido

Instrução final:
Transforme as informações brutas do cliente em um briefing bem estruturado, sem copiar e colar literalmente: sempre organize, adapte e reescreva de forma clara e objetiva.
`

const promptV2 string = `
Você é um Consultor Sênior de Projetos e Estrategista, especialista em transformar ideias vagas em briefings executivos de alto nível.
Sua missão é analisar as informações fornecidas e elaborar um documento que sirva como a "Estrela do Norte" para o projeto, alinhando expectativas de stakeholders e guiando a equipe de execução.

Diretrizes de Qualidade:
1.  **Profissionalismo**: Utilize linguagem corporativa, assertiva e inspiradora.
2.  **Estrutura Lógica**: O documento deve fluir de uma visão macro para detalhes micro.
3.  **Completude Inteligente**: Se faltarem informações críticas, faça suposições educadas baseadas em padrões de mercado, mas marque-as claramente como [Sugestão] ou [A Validar].
4.  **Formatação**: Utilize estritamente React Markdown para uma apresentação visual impecável.

Estrutura Obrigatória do Briefing:

# [Nome do Projeto] - Briefing Executivo

## 1. Visão Estratégica
### Resumo Executivo
Uma síntese poderosa do projeto em 2-3 frases.
### Contexto de Negócio
O "porquê" deste projeto. Qual problema de negócio estamos resolvendo?

## 2. Objetivos e KPIs
### Objetivo Principal
O resultado final inegociável.
### Objetivos Específicos (SMART)
- [ ] Específico
- [ ] Mensurável
- [ ] Atingível
- [ ] Relevante
- [ ] Temporal
### Critérios de Sucesso
Como saberemos que vencemos? (Métricas quantitativas e qualitativas).

## 3. Público e Mercado
### Target Audience
Quem são os usuários/clientes? (Personas, dores e desejos).
### Análise de Concorrência (Se aplicável)
Breve menção a benchmarks ou diferenciais.

## 4. Escopo e Entregáveis
### O que É (In Scope)
Lista detalhada das funcionalidades e entregas.
### O que NÃO É (Out of Scope)
Limites claros para evitar scope creep.

## 5. Restrições e Requisitos
### Cronograma Macro
Fases principais e deadliness.
### Orçamento e Recursos
Estimativas e alocação de time.
### Requisitos Técnicos/Legais
Tecnologias obrigatórias, compliance, LGPD, etc.

## 6. Riscos e Mitigação
| Risco Identificado | Probabilidade | Impacto | Plano de Mitigação |
|-------------------|---------------|---------|--------------------|
| Ex: Atraso na API | Média         | Alto    | Mockar dados...    |

---
*Gerado por Briefing AI System*
`

// CreateBriefing godoc
// @Summary Create a briefing
// @Description Create a briefing from a form
// @Tags briefings
// @Accept  json
// @Produce  json
// @Param briefing body models.BriefingForm true "Briefing Form"
// @Success 200 {object} models.BriefingResult
// @Failure 400 {object} response.Error
// @Failure 422 {object} response.Error
// @Failure 500 {object} response.Error
// @Router /api/briefings [post]
// @Security ApiKeyAuth
func CreateBriefing(w http.ResponseWriter, r *http.Request) {
	userValue := r.Context().Value(middleware.UserContextKey)

	user, ok := userValue.(*models.User)
	if !ok {
		response.ResponseError(w, errors.New("error getting user data"), http.StatusBadRequest)
		return
	}

	var briefingData models.BriefingData

	if err := json.NewDecoder(r.Body).Decode(&briefingData); err != nil {
		response.ResponseError(w, err, http.StatusUnprocessableEntity)
		return
	}
	defer r.Body.Close()

	fmt.Printf("%#v", briefingData)

	briefingJson, err := json.Marshal(briefingData)
	if err != nil {
		response.ResponseError(w, err, http.StatusUnprocessableEntity)
		return
	}

	ctx := context.Background()
	client, err := genai.NewClient(ctx, &genai.ClientConfig{
		APIKey: config.GEMINI_API_KEY,
	})
	if err != nil {
		response.ResponseError(w, err, http.StatusInternalServerError)
		return
	}

	config := &genai.GenerateContentConfig{
		SystemInstruction: genai.NewContentFromText(promptV2, genai.RoleUser),
		ResponseMIMEType:  "application/json",
		ResponseSchema: &genai.Schema{
			Type: genai.TypeObject,
			Properties: map[string]*genai.Schema{
				"briefing_short_title":                    {Type: genai.TypeString, Title: "Um título curto e direto para o briefing"},
				"briefing":                                {Type: genai.TypeString, Title: "O briefing completo em React Markdown"},
				"suggestion_marking_plan":                 {Type: genai.TypeString, Title: "Sugestões para o plano de marcação"},
				"suggestion_adjustments_and_improvements": {Type: genai.TypeString, Title: "Sugestões de ajustes e melhorias"},
				"suggestion_creation_of_content":          {Type: genai.TypeString, Title: "Sugestões para criação de conteúdo"},
			},
			Required: []string{
				"briefing_short_title",
				"briefing",
				"suggestion_marking_plan",
				"suggestion_adjustments_and_improvements",
				"suggestion_creation_of_content",
			},
		},
	}

	result, err := client.Models.GenerateContent(
		ctx,
		"gemini-2.5-flash-lite",
		genai.Text(string(briefingJson)),
		config,
	)
	if err != nil {
		response.ResponseError(w, err, http.StatusInternalServerError)
		return
	}

	if err = json.Unmarshal([]byte(result.Text()), &briefingData.BriefingResult); err != nil {
		response.ResponseError(w, err, http.StatusUnprocessableEntity)
		return
	}

	if err = services.SaveBriefing(user, &briefingData); err != nil {
		response.ResponseError(w, err, http.StatusInternalServerError)
		return
	}

	response.ResponseJSON(w, result, http.StatusOK)
	fmt.Println(briefingData)
}

// GetBriefings godoc
// @Summary Get briefings
// @Description Get all briefings for a user
// @Tags briefings
// @Accept  json
// @Produce  json
// @Success 200 {array} models.Briefing
// @Failure 400 {object} response.Error
// @Failure 500 {object} response.Error
// @Router /api/briefings [get]
// @Security ApiKeyAuth
func GetBriefings(w http.ResponseWriter, r *http.Request) {
	userValue := r.Context().Value(middleware.UserContextKey)

	user, ok := userValue.(*models.User)
	if !ok {
		response.ResponseError(w, errors.New("error getting user data"), http.StatusBadRequest)
		return
	}

	briefings, err := services.GetUserBriefings(user.ID)
	if err != nil {
		response.ResponseError(w, err, http.StatusInternalServerError)
		return
	}

	response.ResponseJSON(w, briefings, http.StatusOK)
}
