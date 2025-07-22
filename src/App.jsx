import React from 'react';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-primary">
          To Do List App
        </h1>
        <p className="mt-2 text-gray-600 max-w-md mx-auto">
          Gérez vos tâches efficacement avec une interface moderne et intuitive
        </p>
      </header>
      
      <main className="w-full max-w-none mx-auto px-4">
        <TodoList />
      </main>
      
      <footer className="mt-16 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} - To Do List App. Created by liantsoaaa.
      </footer>
    </div>
  );
}

export default App;