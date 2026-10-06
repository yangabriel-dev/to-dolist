# Minhas Tarefas (to-dolist)

App de lista de tarefas em React 19 + Vite. JavaScript (JSX), sem TypeScript, sem backend; dados no `localStorage`.

## Comandos

- `npm run dev`: desenvolvimento
- `npm run verify`: lint + build + testes e2e. Rode antes de dizer que terminou.
- `npm run test:e2e`: só os testes Playwright (sobe o `preview` sozinho)
- Para rodar o app e verificar na mão: use a skill `verify-todo`

## Estrutura

- `src/App.jsx`: estado (tarefas, filtro) e todas as funções que mudam tarefas
- `src/components/*`: componentes de apresentação; recebem dados e callbacks por props
- `src/index.css`: todo o CSS (temas Dia/Noite via `data-theme`)
- `tests/e2e/todo.spec.js`: comportamento do usuário
- Mapa de funcionalidades: `.claude/skills/verify-todo/FEATURES.md`

## Regras DURAS (o CI barra; não tente contornar)

1. Sem `useEffect`/`useLayoutEffect`. Alternativas: calcular na renderização, handler de evento, ref callback, ou código fora do React (`main.jsx`).
2. Sem `console.*` no código.
3. Componentes em `src/components` não importam `App`/`main`. A dependência só vai de cima para baixo.
4. `eqeqeq`: sempre `===`.
5. Lint, build e e2e precisam passar.

## Regras MOLES (valem, mas ninguém barra: siga com julgamento)

- O melhor caminho é o mais curto: a menor mudança que resolve. Sem abstração "para o futuro".
- Um PR = uma ideia, até ~400 linhas. Funcionalidade nova e refatoração vão em PRs separados.
- Comentários explicam o PORQUÊ (o projeto é de aprendizado, em português). Não comente o óbvio nem deixe código comentado.
- Acessibilidade primeiro: `label`/`aria-label`, foco visível, `prefers-reduced-motion`.
- Todo texto de UI em português do Brasil.

## Como trabalhar

1. Leia `FEATURES.md` e o código afetado antes de editar.
2. Mudou comportamento? Escreva ou ajuste o teste e2e primeiro.
3. Verifique de verdade: `npm run verify` e, para UI, a skill `verify-todo` com screenshot.
4. Se o agente errou de um jeito repetível, não corrija só o código: atualize esta página, a skill ou crie uma regra de lint, para o erro não voltar.
