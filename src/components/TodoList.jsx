import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await fetch('http://localhost:8000/todos');
        const data = await response.json();
        setTodos(data);
    };

    const addTodo = async (title) => {
        const response = await fetch('http://localhost:8000/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        });
        const newTodo = await response.json();
        setTodos([newTodo, ...todos]);
    };

    const updateTodo = async (id, updatedTodo) => {
        await fetch(`http://localhost:8000/todos/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTodo)
        });
        setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
    };

    const deleteTodo = async (id) => {
        await fetch(`http://localhost:8000/todos/${id}`, { method: 'DELETE' });
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="todo-card max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-center text-dark mb-8">📝 To-Do List</h1>
            <AddTodo onAdd={addTodo} />

            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                {todos.length > 0 ? (
                    todos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onUpdate={updateTodo}
                            onDelete={deleteTodo}
                        />
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        <p>🎉 Aucune tâche pour le moment !</p>
                        <p className="mt-2">Commencez par ajouter une tâche ci-dessus 👆</p>
                    </div>
                )}
            </div>

            <div className="mt-4 text-center text-sm text-gray-500">
                {todos.length} tâche{todos.length !== 1 ? 's' : ''} au total
            </div>
        </div>
    );
};

export default TodoList;