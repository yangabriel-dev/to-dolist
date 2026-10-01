import { useState, useEffect } from "react";
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import TodoFooter from './components/TodoFooter';
import ThemeToggle from './components/ThemeToggle';

// Formata a data de hoje como "quarta-feira, 1 de outubro de 2026"
const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

// Carrega as tarefas salvas no localStorage, ou começa com um array vazio.
function loadTodos() {
  try {
    const savedTodos = localStorage.getItem('todo');
    return savedTodos ? JSON.parse(savedTodos) : [];
  } catch {
    return [];
  }
}

function App() {
  // Estado para armazenar as tarefas.
  const [todos, setTodos] = useState(loadTodos);
  // Estado para o filtro atual ('all', 'active', 'completed')
  const [filter, setFilter] = useState('all');

  // Efeito para salvar os 'todos' no localStorage sempre que eles mudarem.
  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todos));
  }, [todos]);

  // Depois da animação de entrada, o que aparecer na tela entra sem atraso.
  useEffect(() => {
    const timer = setTimeout(() => {
      document.documentElement.classList.add('is-ready');
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  // Função para adicionar uma nova tarefa
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(), // ID único baseado no timestamp
      text: text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  // Função para marcar uma tarefa como concluída/não concluída
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    );
  };

  // Função para editar o texto de uma tarefa
  const editTodo = (id, text) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  // Função para remover uma tarefa
  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Função para remover todas as tarefas concluídas
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // Filtra as tarefas com base no estado do filtro
  const filterTodos = todos.filter((todo) => {
    if (filter === 'active') {
      return !todo.completed;
    }
    if (filter === 'completed') {
      return todo.completed;
    }
    return true; // 'all'
  });

  // Contadores exibidos no rodapé
  const completedCount = todos.filter((todo) => todo.completed).length;
  const remaining = todos.length - completedCount;

  return (
    <main className="todo-app">
      <header className="masthead">
        <div className="masthead-top">
          <p className="dateline">{dateFormatter.format(new Date())}</p>
          <ThemeToggle />
        </div>
        <div className="masthead-rule" aria-hidden="true" />
        <h1 className="title">
          Minhas <br />
          <em>tarefas</em>.
        </h1>
      </header>

      <TodoForm addTodo={addTodo} />
      <TodoFilter filter={filter} setFilter={setFilter} />
      <TodoList
        todos={filterTodos}
        filter={filter}
        toggleComplete={toggleComplete}
        editTodo={editTodo}
        removeTodo={removeTodo}
      />
      {todos.length > 0 && (
        <TodoFooter
          remaining={remaining}
          completedCount={completedCount}
          clearCompleted={clearCompleted}
        />
      )}
    </main>
  );
}
export default App;
