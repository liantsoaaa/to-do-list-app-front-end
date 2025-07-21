import React, { useState } from 'react';

const AddTodo = ({ onAdd }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            onAdd(title);
            setTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex items-center">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ajouter une nouvelle tâche..."
                    className="flex-1 px-4 py-3 rounded-l-lg border-2 border-r-0 border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                    type="submit"
                    className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-r-lg font-medium transition-colors shadow-md"
                >
                    Ajouter
                </button>
            </div>
        </form>
    );
};

export default AddTodo;