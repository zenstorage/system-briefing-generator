# Diagrama de Atividades

## 1. O que é?

Um **Diagrama de Atividades** é outro tipo de diagrama da UML que serve para modelar os fluxos de trabalho (workflows) de um sistema. Ele é excelente para descrever a dinâmica do sistema, mostrando o fluxo de controle de uma atividade para outra.

Diferente do diagrama de classes (que é estático), o diagrama de atividades é dinâmico e foca nos processos e nas operações.

## 2. Diagrama: Geração de Briefing

Abaixo está o diagrama de atividades que descreve o processo principal do sistema: a geração de um novo briefing pelo usuário.

```mermaid
activityDiagram
    title Fluxo de Geração de Briefing

    start
    :Usuário acessa a página de geração;
    :Preenche o formulário do briefing;
    :Clica em "Gerar Briefing";
    :Sistema valida os dados do formulário;

    if (Dados são válidos?) then (Sim)
        :Sistema envia os dados para o serviço de IA;
        :Serviço de IA processa e gera o conteúdo;
        :Sistema recebe o resultado;
        :Salva o briefing no banco de dados;
        :Exibe o briefing gerado para o usuário;
    else (Não)
        :Exibe mensagem de erro;
        :Permite que o usuário corrija o formulário;
        stop
    endif

    stop
```

### Explicação do Fluxo

1.  **Início:** O processo começa quando o usuário decide criar um novo briefing.
2.  **Preenchimento:** O usuário preenche todos os campos necessários no formulário.
3.  **Validação:** Após o envio, o sistema realiza uma validação para garantir que todos os dados obrigatórios foram fornecidos e estão no formato correto.
4.  **Decisão:**
    *   Se os dados forem **inválidos**, o sistema informa o usuário sobre o erro e o processo para, aguardando a correção.
    *   Se os dados forem **válidos**, o fluxo continua.
5.  **Processamento:** O sistema envia as informações para o backend, que por sua vez pode se comunicar com uma API de Inteligência Artificial para processar os dados e criar o conteúdo do briefing.
6.  **Armazenamento:** O resultado gerado é salvo no banco de dados, associado ao perfil do usuário.
7.  **Exibição:** Por fim, o briefing finalizado é exibido na tela para o usuário.
8.  **Fim:** O processo é concluído.
