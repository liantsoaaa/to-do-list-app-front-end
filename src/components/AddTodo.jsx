import React, { useState } from 'react';
import { Input, Button } from "@material-tailwind/react";
import { FaPlusCircle } from "react-icons/fa";

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
        <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col sm:flex-row items-end gap-2">
                <div className="flex-grow w-full">
                    <Input
                        label="Ajouter une nouvelle tâche..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        size="lg"
                        className="!border !border-gray-300 bg-white text-gray-900 
                                shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]
                                transform transition-all duration-300 hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.15),0_10px_15px_-8px_rgba(0,0,0,0.1)]
                                focus:shadow-[0_20px_25px_-5px_rgba(59,130,246,0.3),0_10px_10px_-5px_rgba(59,130,246,0.1)]
                                focus:scale-[1.01] focus:translate-y-[-2px] rounded-md text-sm sm:text-base"
                        labelProps={{
                            className: "hidden",
                        }}
                        containerProps={{
                            className: "min-w-0 w-full",
                        }}
                    />
                </div>
                <Button
                    type="submit"
                    className="flex items-center gap-2 bg-primary w-full sm:w-auto
                            shadow-[0_10px_25px_-5px_rgba(59,130,246,0.3),0_8px_10px_-6px_rgba(59,130,246,0.1)]
                            transform transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_30px_-5px_rgba(59,130,246,0.4),0_10px_15px_-8px_rgba(59,130,246,0.2)] 
                            mt-2 sm:mt-0 md:text-center"
                    size="md"
                >
                    <FaPlusCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-sm sm:text-base">Ajouter</span>
                </Button>
            </div>
        </form>
    );
};

export default AddTodo;