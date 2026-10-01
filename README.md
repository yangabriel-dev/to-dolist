# Minhas Tarefas

Uma lista de tarefas com cara de caderno editorial, feita com React e Vite.

## Recursos

- Adicionar, marcar como concluída e remover tarefas
- Editar uma tarefa com duplo clique (ou pelo botão "editar")
- Filtros: todas, ativas e concluídas
- Contador de tarefas restantes e botão para limpar as concluídas
- Tema claro (Dia) e escuro (Noite), com a escolha salva no navegador
- Tarefas salvas no `localStorage`, então continuam lá quando você volta

## Como rodar

```bash
npm install
npm run dev
```

Outros comandos:

- `npm run build`: gera a versão de produção em `dist/`
- `npm run preview`: serve a versão de produção localmente
- `npm run lint`: verifica o código com o ESLint

## Visual

- Tipografia: [Fraunces](https://fonts.google.com/specimen/Fraunces) nos títulos e tarefas, [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) nos rótulos; as duas vêm do [Fontsource](https://fontsource.org), sem depender de CDN
- Paleta de papel e tinta com acento terracota, nas edições Dia e Noite
- Detalhes de caderno: fio duplo de jornal, linhas pautadas, margem numerada e o risco que se desenha ao concluir uma tarefa
- As animações são desligadas para quem prefere menos movimento (`prefers-reduced-motion`)
