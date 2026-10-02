import { useState } from "react";

function TodoForm({ addTodo }) {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); //Impede o recarregamento da página
        if (!value.trim()) return; // Não adiciona tarefa vazia
        addTodo(value.trim());
        setValue('');  //Limpa o input após adicionar
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <label htmlFor="new-todo" className="sr-only">Nova tarefa</label>
            <input
             id="new-todo"
             type="text"
             className="todo-input"
             value={value}
             onChange={(e) => setValue(e.target.value)}
             placeholder="Escreva algo para hoje…"
             autoComplete="off"
            />
            <button type="submit" className="todo-button">
                Adicionar <span aria-hidden="true">↵</span>
            </button>
        </form>
    )
}
export default TodoForm;
