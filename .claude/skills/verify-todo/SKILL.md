---
name: verify-todo
description: Verifica de verdade uma mudança no app de tarefas (to-dolist): sobe o app, exercita o fluxo afetado no navegador, tira screenshot e roda lint, build e e2e. Use antes de dizer que uma mudança está pronta, e ao revisar PRs.
---

# Verificar o app de tarefas

Não declare "pronto" sem evidência. Compilar não prova que funciona.

## Passos

1. **Ler o mapa**: abra `FEATURES.md` e ache as funcionalidades que a mudança toca (e as vizinhas que podem quebrar).
2. **Gate automático**: rode `npm run verify`. Se falhar, corrija a causa; não afrouxe regra de lint nem apague teste.
3. **Rodar o app de verdade**: `npm run build && npm run preview -- --port 4173`. Com Playwright (ou o navegador), siga o fluxo afetado como usuário: adicionar, concluir, filtrar, editar (Enter, Esc, duplo clique), remover, recarregar, trocar o tema.
4. **Evidência**: tire screenshot do estado final em tema Dia e Noite, largura desktop (1280) e mobile (390). Olhe as imagens: texto cortado, contraste, foco visível.
5. **Console limpo**: nenhum erro ou aviso no console durante o fluxo.
6. **Cobertura**: se o comportamento mudou e nenhum teste e2e falharia se ele quebrasse, escreva o teste.
7. **Relatório** (curto):
   - Funcionalidades verificadas (nomes do `FEATURES.md`)
   - Comandos rodados e resultado
   - O que NÃO foi verificado
   - Riscos restantes

## Regras

- Nunca marque como verificado algo que você não executou.
- Bug achado fora do escopo: anote no relatório, não corrija no mesmo PR.
- Se errar de um jeito repetível, proponha atualizar `CLAUDE.md`, esta skill ou uma regra de lint.
