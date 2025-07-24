import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Checkbox, IconButton, Typography, Input } from "@material-tailwind/react";
import { FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";

const TodoItem = ({ todo, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);

    const handleSave = () => {
        if (editedTitle.trim()) {
            onUpdate(todo.id, { ...todo, title: editedTitle });
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditedTitle(todo.title);
        setIsEditing(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50 }}
            layout
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 mb-2 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="flex items-center space-x-3 w-full mb-2 sm:mb-0">
                <Checkbox
                    checked={todo.completed}
                    onChange={() => onUpdate(todo.id, { ...todo, completed: !todo.completed })}
                    ripple={false}
                    className="h-4 w-4 sm:h-5 sm:w-5 rounded-full border-gray-700/20 bg-black transition-all hover:scale-105 hover:before:opacity-0"
                />
                
                {isEditing ? (
                    <Input
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="flex-1 !border !border-blue-500 bg-sky-200 text-gray-900 
                                shadow-sm focus:!border-blue-500 focus:!ring-blue-500 text-sm sm:text-base"
                        autoFocus
                        containerProps={{
                            className: "min-w-0",
                        }}
                    />
                ) : (
                    <Typography
                        variant="paragraph"
                        className={`text-base sm:text-lg font-normal flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
                    >
                        {todo.title}
                    </Typography>
                )}
            </div>
            
            <div className="flex space-x-2 self-end sm:self-auto">
                {isEditing ? (
                    <>
                        <IconButton
                            variant="text"
                            onClick={handleSave}
                            className="rounded-full text-green-500 hover:bg-green-50"
                        >
                            <FaSave className="h-4 w-4" />
                        </IconButton>
                        <IconButton
                            variant="text"
                            onClick={handleCancel}
                            className="rounded-full text-gray-500 hover:bg-blue-50"
                        >
                            <FaTimes className="h-4 w-4" />
                        </IconButton>
                    </>
                ) : (
                    <>
                        <IconButton
                            variant="text"
                            onClick={() => setIsEditing(true)}
                            className="rounded-full text-gray-300 hover:bg-blue-50"
                        >
                            <FaEdit className="h-4 w-4" />
                        </IconButton>
                        <IconButton
                            variant="text"
                            onClick={() => onDelete(todo.id)}
                            className="rounded-full text-gray-300 hover:bg-red-50 hover:text-red-500"
                        >
                            <FaTrash className="h-4 w-4" />
                        </IconButton>
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default TodoItem;