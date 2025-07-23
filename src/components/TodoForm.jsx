import { useState } from "react";

function TodoForm({ addTodo}) {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); //Impede o recarregamento da página
        if (!value.trim()) return; // Não adiciona tarefa vazia
        addTodo(value);
        setValue('');  //Limpa o input após adicionar
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
             type="text"
             className="todo-input"
             value={value}
             onChange={(e) => setValue(e.target.value)}
             placeholder="Adicionar Nova Tarefa..." 
            />
            <button type="submit" className="todo-button">Adicionar</button>
        </form>
    )
}
export default TodoForm;