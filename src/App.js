import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './componets/Todolist';
import TodoInput from './componets/Todoinput';
import FilterButtons from './componets/FilterButtons';
import SortSelect from './componets/SortSelect';
import Footer from "./componets/Footer";
function App() {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('default');

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
        setTodos(savedTodos);
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text) => {
        if (text.trim() === '') return;
        const newTodo = {
            text,
            completed: false,
            date: new Date().toLocaleDateString()
        };
        setTodos([...todos, newTodo]);
    };

    const toggleComplete = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };

    const deleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    const clearTodos = () => {
        setTodos([]);
        localStorage.removeItem('todos');
    };

    const filteredTodos = todos.filter(todo => {
        switch (filter) {
            case 'completed':
                return todo.completed;
            case 'not-completed':
                return !todo.completed;
            default:
                return true;
        }
    });

    const sortedTodos = [...filteredTodos].sort((a, b) => {
        if (sortBy === 'alphabet') {
            return a.text.localeCompare(b.text, 'ru');
        } else if (sortBy === 'alphabet-reverse') {
            return b.text.localeCompare(a.text, 'ru');
        }
        return 0;
    });

    return (
        <div className="App">
            <div className="background">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <h1>Список дел</h1>
            <div className="todo-container">
                <TodoInput onAdd={addTodo} onClear={clearTodos} />
                <TodoList
                    todos={sortedTodos}
                    onToggleComplete={toggleComplete}
                    onDelete={deleteTodo}
                />
            </div>
            <div className="line">
                <div></div>
            </div>
            <div className="button-navfooter">
                <FilterButtons currentFilter={filter} onFilterChange={setFilter} />
                <SortSelect currentSort={sortBy} onSortChange={setSortBy} />
            </div>
            <Footer />
        </div>
    );
}

export default App;