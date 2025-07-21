import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import { Typography } from "@material-tailwind/react";
import { FaClipboardList } from "react-icons/fa";

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
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-4xl mx-auto"
        >
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-gradient-to-r from-primary to-indigo-600 p-3 rounded-xl">
                    <FaClipboardList className="h-8 w-8 text-white" />
                </div>
                <div>
                    <Typography variant="h3" className="text-gray-900">
                        Mes Tâches
                    </Typography>
                    <Typography variant="small" className="text-gray-600">
                        {todos.length} tâche{todos.length !== 1 ? 's' : ''} au total
                    </Typography>
                </div>
            </div>
            
            <AddTodo onAdd={addTodo} />
            
            <div className="mt-6 max-h-[60vh] overflow-y-auto pr-2">
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
            
            <div className="mt-6 pt-4 border-t border-gray-100">
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