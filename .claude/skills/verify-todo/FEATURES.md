# Mapa de funcionalidades

Cada linha: o que o usuário faz, onde vive no código, qual teste cobre. Ao criar ou mudar uma funcionalidade, atualize aqui.

| Funcionalidade | Código | Teste e2e |
|---|---|---|
| Adicionar tarefa (Enter ou botão) | `TodoForm.jsx`, `addTodo` em `App.jsx` | adiciona tarefa e mostra o contador |
| Ignorar tarefa vazia | `TodoForm.jsx` (`trim`) | nao adiciona tarefa vazia |
| Concluir/desfazer | `TodoItem.jsx` checkbox, `toggleComplete` | conclui, filtra e limpa concluidas |
| Filtros Todas/Ativas/Concluídas | `TodoFilter.jsx`, `filterTodos` | conclui, filtra e limpa concluidas |
| Contador singular/plural | `TodoFooter.jsx` | adiciona tarefa e mostra o contador |
| Limpar concluídas | `TodoFooter.jsx`, `clearCompleted` | conclui, filtra e limpa concluidas |
| Editar (duplo clique ou botão), Enter salva, Esc cancela, foco volta ao botão | `TodoItem.jsx` (`focusEditButton`) | edita com Enter..., edita com duplo clique |
| Remover | `TodoItem.jsx`, `removeTodo` | remove tarefa |
| Persistência das tarefas | `saveTodos`/`loadTodos` em `App.jsx`, chave `todo` | tarefas persistem depois de recarregar, remocao e conclusao tambem |
| Tema Dia/Noite persistente | `ThemeToggle.jsx`, script em `index.html`, chave `theme` | tema escolhido persiste |
| Animação de entrada (`is-ready`) | `main.jsx`, `index.css` | sem erros no console (indireto) |

## Pontos frágeis conhecidos

- `id: Date.now()` pode colidir se duas tarefas forem criadas no mesmo milissegundo.
- Dados corrompidos em `localStorage` caem em lista vazia (silencioso).
- Sem teste de acessibilidade automático (axe) nem de layout mobile.
