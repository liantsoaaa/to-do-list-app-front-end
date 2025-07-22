import React from 'react';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-8 sm:py-12 px-3 sm:px-6">
      <header className="text-center mb-10 sm:mb-16">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-primary">
          To Do List App
        </h1>
        <p className="mt-1 sm:mt-2 text-gray-600 max-w-md mx-auto text-sm sm:text-base">
          Gérez vos tâches efficacement avec une interface moderne et intuitive
        </p>
      </header>
      
      <main className="w-full max-w-none mx-auto px-2 sm:px-4">
        <TodoList />
      </main>
      
      <footer className="mt-10 sm:mt-16 text-center text-gray-500 text-xs sm:text-sm">
        © {new Date().getFullYear()} - To Do List App. Created by liantsoaaa.
      </footer>
    </div>
  );
}

export default App;