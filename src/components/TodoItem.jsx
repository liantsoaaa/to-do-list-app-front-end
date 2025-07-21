import React from 'react';
import { motion } from "framer-motion";
import { Checkbox, IconButton, Typography } from "@material-tailwind/react";
import { FaTrash } from "react-icons/fa";

const TodoItem = ({ todo, onUpdate, onDelete }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50 }}
            layout
            className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 mb-2 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="flex items-center space-x-3">
                <Checkbox
                    checked={todo.completed}
                    onChange={() => onUpdate(todo.id, { ...todo, completed: !todo.completed })}
                    ripple={false}
                    className="h-5 w-5 rounded-full border-gray-700/20 bg-black transition-all hover:scale-105 hover:before:opacity-0"
                />
                <Typography
                    variant="paragraph"
                    className={`text-lg font-normal ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
                >
                    {todo.title}
                </Typography>
            </div>
            <IconButton
                variant="text"
                onClick={() => onDelete(todo.id)}
                className="rounded-full text-gray-300 hover:bg-red-50 hover:text-red-500"
            >
                <FaTrash className="h-5 w-5" />
            </IconButton>
        </motion.div>
    );
};

export default TodoItem;