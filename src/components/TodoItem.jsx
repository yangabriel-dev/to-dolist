function TodoItem ({ todo, toggleCompleted, removeTodo}) {
    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <span
            onClick={() => toggleCompleted(todo.id)}
            className="todo-text">
            {todo.text}
            </span>
            <button
             onClick={() => removeTodo(todo.id)}
             className="remove-btn">
                &times;              
            </button>
        </div>
    )
}
export default TodoItem;