import { useState, useEffect } from "react";
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import './index.css'; 

function App() {
   // Estado para armazenar as tarefas.
   // A inicialização tenta carregar do localStorage, ou começa com um array vazio.
  const [todo, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todo');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  // Estado para o filtro atual ('all', 'active', 'completed')
  const [filter, setFilter] = useState('all');

  // Efeito para salvar os 'todos' no localStorage sempre que eles mudarem.
  useEffect(() => {
    localStorage.setItem('todo',JSON.stringify(todo));
  }, [todo]);

   // Função para adicionar uma nova tarefa
   const addTodo = (text) => {
    const newTodo = {
      id: Date.now(), //ID único baseado no timestamp
      text: text,
      completed: false,
    };
    setTodos([...todo, newTodo]);
   };

    // Função para marcar uma tarefa como concluída/não concluída
    const toggleComplete = (id) => {
      setTodos(
        todos.map((todo) =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo)
      );
    };

    // Função para remover uma tarefa
    const removeTodo = (id) => {
      setTodos(todo.filter((todo) => todo.id !== id));
    };

    // Filtra as tarefas com base no estado do filtro
    const filterTodos = todo.filter(todo => {
      if (filter === 'active') {
        return !todo.completed;
      }
      if(filter === 'completed') {
        return todo.completed;
      }
      return true; //'all'
    });
    return(
      <div className="todo-app">
        <h1>Minha Lista de Tarefas</h1>
        <TodoForm addTodo={addTodo}/>
        <TodoFilter filter={filter} setFilter={setFilter}/>
        <TodoList
          todos={filterTodos}
          toggleComplete={toggleComplete}
          removeTodo={removeTodo}
        />
      </div>
    );
}
export default App;