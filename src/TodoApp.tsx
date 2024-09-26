import React, { useState } from 'react';

// Define the type for the todo
interface Todo {
    text: string;
    completed: boolean;
}

const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");
    const [doneCount, setDoneCount] = useState<number>(0);

    // Function to add a new todo
    const addTodo = () => {
        if (newTodo.trim() !== "") {
            const updatedTodos = [...todos, { text: newTodo, completed: false }];
            setTodos(updatedTodos);
            setNewTodo("");
        }
    };

    // Function to toggle the completion of a todo
    const toggleComplete = (index: number) => {
        const updatedTodos = [...todos];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        setTodos(updatedTodos);
        // Update done count
        const completedTodos = updatedTodos.filter(todo => todo.completed).length;
        setDoneCount(completedTodos);
    };

    // Function to delete a todo
    const deleteTodo = (index: number) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
        // Update done count after deletion
        const completedTodos = updatedTodos.filter(todo => todo.completed).length;
        setDoneCount(completedTodos);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
            <h1 className="text-3xl font-bold mb-5">To-Do List</h1>

            {/* List of Todos */}
            <ul className="w-full max-w-md mb-5">
                {todos.map((todo, index) => (
                    <li key={index} className="flex justify-between items-center p-3 bg-white rounded-lg mb-2 shadow">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleComplete(index)}
                                className="mr-3"
                            />
                            <span className={`text-lg ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                                {todo.text}
                            </span>
                        </div>
                        <button
                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                            onClick={() => deleteTodo(index)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            {/* Input Section */}
            <div className="flex space-x-2 mb-5 w-full max-w-md">
                <input
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    type="text"
                    placeholder="Add a new task..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    onClick={addTodo}
                >
                    Save
                </button>
            </div>

            {/* Done Count */}
            <div className="text-lg font-bold">
                Done: {doneCount}
            </div>
        </div>
    );
};

export default TodoApp;
