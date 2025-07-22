import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import { Typography } from "@material-tailwind/react";
import { FaClipboardList } from "react-icons/fa";

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    const apiUrl = 'https://to-do-list-backend-fastapi.onrender.com' || import.meta.env.API_URL

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await fetch(`${apiUrl}/todos`);
        const data = await response.json();
        setTodos(data);
    };

    const addTodo = async (title) => {
        const newTodoTemp = {
            id: Date.now(), // ID temporaire pour l'UI
            title,
            completed: false,
            created_at: new Date().toISOString()
        };

        // Mise à jour optimiste
        setTodos([newTodoTemp, ...todos]);

        try {
            const response = await fetch(`${apiUrl}/todos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title })
            });

            if (!response.ok) throw new Error('Failed to add todo');

            const newTodo = await response.json();

            // Remplacement du todo temporaire par le vrai
            setTodos(prev => [
                newTodo,
                ...prev.filter(t => t.id !== newTodoTemp.id)
            ]);
        } catch (error) {
            console.error('Error adding todo:', error);
            // Revert en cas d'erreur
            setTodos(todos);
        }
    };

    const updateTodo = async (id, updatedTodo) => {
        const originalTodos = [...todos];

        // Mise à jour optimiste
        setTodos(prev => prev.map(t => t.id === id ? { ...t, ...updatedTodo } : t));

        try {
            const response = await fetch(`${apiUrl}/todos/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTodo)
            });

            if (!response.ok) throw new Error('Failed to update todo');

            // Actualisation pour s'assurer que les données sont à jour
            fetchTodos();
        } catch (error) {
            console.error('Error updating todo:', error);
            // Revert en cas d'erreur
            setTodos(originalTodos);
        }
    };

    const deleteTodo = async (id) => {
        const originalTodos = [...todos];

        // Mise à jour optimiste
        setTodos(prev => prev.filter(t => t.id !== id));

        try {
            const response = await fetch(`${apiUrl}/todos/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete todo');
        } catch (error) {
            console.error('Error deleting todo:', error);
            // Revert en cas d'erreur
            setTodos(originalTodos);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-4xl mx-auto"
        >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6 sm:mb-8">
                <div className="bg-gradient-to-r from-primary to-indigo-600 p-2 sm:p-3 rounded-xl">
                    <FaClipboardList className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div>
                    <Typography variant="h3" className="text-xl sm:text-2xl md:text-3xl text-gray-900">
                        Mes Tâches
                    </Typography>
                    <Typography variant="small" className="text-gray-600 text-sm sm:text-base">
                        {todos.length} tâche{todos.length !== 1 ? 's' : ''} au total
                    </Typography>
                </div>
            </div>

            <AddTodo onAdd={addTodo} />

            <div className="mt-4 sm:mt-6 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto pr-2">
                <AnimatePresence>
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
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-10"
                        >
                            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaClipboardList className="h-8 w-8 text-gray-400" />
                            </div>
                            <Typography variant="h5" className="text-gray-500 mb-2">
                                Aucune tâche pour le moment
                            </Typography>
                            <Typography variant="small" className="text-gray-400">
                                Commencez par ajouter une tâche ci-dessus
                            </Typography>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                    <Typography variant="small" className="text-gray-500">
                        {todos.filter(t => t.completed).length} complétée{todos.filter(t => t.completed).length !== 1 ? 's' : ''}
                    </Typography>
                    <Typography variant="small" className="text-gray-500">
                        {todos.filter(t => !t.completed).length} en attente
                    </Typography>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                        style={{ width: `${todos.length ? (todos.filter(t => t.completed).length / todos.length) * 100 : 0}%` }}
                    ></div>
                </div>
            </div>
        </motion.div>
    );
};

export default TodoList;