import React from 'react';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          My Todo App
        </h1>
      </header>
      
      <main>
        <TodoList />
      </main>
      
      <footer className="mt-16 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} - Todo App by FastAPI + React
      </footer>
    </div>
  );
}

export default App;