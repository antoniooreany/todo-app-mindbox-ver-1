import React, { useState } from 'react';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim() === '') return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setInput('');
  };

  const toggleCompleted = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(t => !t.completed));
  };

  const remainingCount = todos.filter(t => !t.completed).length;

  return (
    <div style={{ maxWidth: 600, margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>ToDo-приложение</h1>
      <input
        type="text"
        placeholder="Введите новую задачу"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') addTodo(); }}
        style={{ width: '80%', padding: 8, fontSize: 16 }}
        aria-label="Новое дело"
      />
      <button onClick={addTodo} style={{ padding: '8px 12px', marginLeft: 8 }}>Добавить</button>

      <h2>Все задачи</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ marginBottom: 8 }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id)}
              aria-label={`Отметить задачу "${todo.text}" как выполненную`}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', marginLeft: 8 }}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>

      <h2>Невыполненные задачи</h2>
      <ul>
        {todos.filter(t => !t.completed).map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>

      <h2>Выполненные задачи</h2>
      <ul>
        {todos.filter(t => t.completed).map(todo => (
          <li key={todo.id} style={{ textDecoration: 'line-through' }}>{todo.text}</li>
        ))}
      </ul>

      <p>Осталось задач: {remainingCount}</p>
      <button onClick={clearCompleted} disabled={todos.filter(t => t.completed).length === 0}>
        Очистить выполненные
      </button>
    </div>
  );
};

export default App;
