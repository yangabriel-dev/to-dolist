import TodoItem from './TodoItem';

// Mensagem exibida quando o filtro atual não tem tarefas
const EMPTY_MESSAGES = {
    all: 'Página em branco. Escreva a primeira tarefa acima.',
    active: 'Nada pendente por aqui.',
    completed: 'Nenhuma tarefa riscada ainda.',
};

function TodoList ({ todos, filter, toggleComplete, editTodo, removeTodo }) {
    if (todos.length === 0) {
        return <p className='empty-message'>{EMPTY_MESSAGES[filter]}</p>;
    }

    return (
        <ol className='todo-list' role='list'>
            {todos.map((todo, index) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  index={index}
                  toggleComplete={toggleComplete}
                  editTodo={editTodo}
                  removeTodo={removeTodo}
                />
            ))}
        </ol>
    );
}
export default TodoList;
