function TodoFooter({ remaining, completedCount, clearCompleted }) {
    // Texto do contador no singular ou no plural
    let remainingText = `${remaining} tarefas restantes`;
    if (remaining === 0) remainingText = 'Nenhuma tarefa restante';
    if (remaining === 1) remainingText = '1 tarefa restante';

    return (
        <footer className="todo-footer">
            <p className="todo-count" aria-live="polite">{remainingText}</p>
            <button
             type="button"
             className="clear-btn"
             onClick={clearCompleted}
             disabled={completedCount === 0}>
                Limpar concluídas{completedCount > 0 && ` (${completedCount})`}
            </button>
            <p className="todo-hint">Dica: clique duas vezes numa tarefa para editar.</p>
        </footer>
    );
}
export default TodoFooter;
