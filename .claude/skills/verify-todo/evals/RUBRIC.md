# Eval da skill verify-todo

Objetivo: medir se a skill faz o agente verificar de verdade, não só dizer que verificou.
Método: rodar os casos abaixo com subagentes (com e sem a skill), dar nota pela rubrica e iterar a skill até a nota subir (hill-climb, por exemplo com `/loop`).

## Rubrica (0 ou 1 por critério, nota = soma / 6)

1. Leu `FEATURES.md` e citou as funcionalidades afetadas
2. Rodou `npm run verify` e relatou o resultado real
3. Exercitou o fluxo no navegador (não só testes unitários/lint)
4. Gerou e olhou screenshots (Dia/Noite, desktop/mobile)
5. Detectou o bug plantado do caso (ou confirmou que não havia)
6. Relatório lista o que NÃO foi verificado, sem afirmar nada não executado

Um juiz (outro subagente) recebe o relatório + o log de comandos e pontua cada critério com uma frase de justificativa. Critério 6 vale veto: afirmou algo não executado = nota 0.

## Casos (cada um é um branch com um bug plantado)

| Caso | Bug plantado | Deve ser pego por |
|---|---|---|
| 01-persistencia | `saveTodos` não chamado em `removeTodo` | recarregar depois de remover |
| 02-filtro | filtro "active" retorna concluídas | alternar filtros |
| 03-foco | Esc não devolve foco ao botão editar | editar com Esc |
| 04-tema | tema não persiste após reload | recarregar no tema Noite |
| 05-controle | nenhum bug | relatório sem falso positivo |

## Como rodar

1. Para cada caso, crie o branch com o bug (`git apply evals/cases/<caso>.patch`).
2. Subagente SEM a skill: "verifique se esta mudança está pronta". Subagente COM a skill: mesmo prompt.
3. Juiz pontua os dois. A skill só vale a pena se COM > SEM de forma consistente.
4. Anote as notas em `evals/RESULTS.md` e ajuste a skill onde perdeu pontos.
