import TodoItem from './TodoItem';

function TodoList ({ todos, toggleCompleted, removeTodo}) {
    return (
        <div className='todo-list'>
            {todos.length === 0 ? (
                <p className='empty-message'>Nenhuma Tarefa aqui!</p>

            ) : (
                todos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      toggleCompleted={toggleCompleted}
                      removeTodo={removeTodo} 
                    />
                ))
            )}
        </div>
    );
}
export default TodoList;