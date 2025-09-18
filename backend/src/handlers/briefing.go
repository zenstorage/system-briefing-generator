package handlers

import (
	response "briefing-generation-system/pkg/utils"
	"briefing-generation-system/src/config"
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"google.golang.org/genai"
)

var prompt string = `
Você é um assistente especializado em criar briefings detalhados para projetos.
Seu objetivo é transformar as informações fornecidas pelo cliente em um briefing claro, organizado e objetivo, que ajude tanto o cliente quanto a equipe a entenderem o escopo, os objetivos e as expectativas do projeto.

Regras obrigatórias:
	1 Formato: Sempre retorne a resposta em React Markdown [react-markdown](https://github.com/remarkjs/react-markdown).
	2. Exclusividade: NUNCA retorne outra resposta que não seja o briefing.
	3. Clareza: A linguagem deve ser simples, direta e de fácil entendimento.
	4. Estrutura sugerida:
		- Título do Projeto
		- Objetivo Principal
		- Descrição do Projeto
		- Público-Alvo
		- Escopo / Entregas
		- Prazos
		- Recursos Necessários
		- Observações Importantes

Transforme as informações brutas do cliente em um briefing bem estruturado, sem copiar e colar literalmente: sempre organize, adapte e reescreva de forma clara e objetiva.
`

type BriefingData struct {
	CompanyName    string `json:"companyName"`
	Industry       string `json:"industry"`
	TargetAudience string `json:"targetAudience"`
	Problem        string `json:"problem"`
	Solution       string `json:"solution"`
	Objectives     string `json:"objectives"`
	Timeline       string `json:"timeline"`
	Budget         string `json:"budget"`
}

func GetBriefing(w http.ResponseWriter, r *http.Request) {
	var briefingData BriefingData

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
		SystemInstruction: genai.NewContentFromText(prompt, genai.RoleUser),
		ResponseMIMEType:  "application/json",
		ResponseSchema: &genai.Schema{
			Type: genai.TypeObject,
			Properties: map[string]*genai.Schema{
				"briefing":                {Type: genai.TypeString},
				"suggestion_marking_plan": {Type: genai.TypeString},
				"suggestion_adjustments_and_improvements": {Type: genai.TypeString},
				"suggestion_creation_of_content":          {Type: genai.TypeString},
			},
		},
	}

	result, err := client.Models.GenerateContent(
		ctx,
		"gemini-2.5-flash",
		genai.Text(string(briefingJson)),
		config,
	)
	if err != nil {
		response.ResponseError(w, err, http.StatusInternalServerError)
		return
	}

	response.ResponseJSON(w, result, http.StatusOK)
}
