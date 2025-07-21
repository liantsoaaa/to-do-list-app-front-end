import React from 'react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-blue-50 transition-colors">
            <div className="flex items-center space-x-3">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onUpdate(todo.id, { ...todo, completed: !todo.completed })}
                    className="h-5 w-5 text-primary rounded-full focus:ring-0"
                />
                <span className={`text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-dark'}`}>
                    {todo.title}
                </span>
            </div>
            <button
                onClick={() => onDelete(todo.id)}
                className="p-2 text-secondary hover:bg-red-50 rounded-full transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
};

export default TodoItem;