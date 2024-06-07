import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // Initialize tasks state with empty array
  const [tasks, setTasks] = useState([]);
  // Initialize form state for task input
  const [taskInput, setTaskInput] = useState({ name: '', description: '' });
  // Initialize state for edit mode and edit index
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Load tasks from browser storage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to browser storage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to handle input change in the task form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskInput({ ...taskInput, [name]: value });
  };

  // Function to add a new task
  const addTask = () => {
    if (taskInput.name && taskInput.description) {
      setTasks([...tasks, taskInput]);
      setTaskInput({ name: '', description: '' });
    } else {
      alert('Please fill in both task name and description.');
    }
  };

  // Function to delete a task
  const deleteTask = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      const updatedTasks = tasks.filter((task, i) => i !== index);
      setTasks(updatedTasks);
    }
  };

  // Function to handle editing mode
  const handleEdit = (index) => {
    setEditMode(true);
    setEditIndex(index);
    setTaskInput(tasks[index]);
  };

  // Function to save edited task
  const saveEdit = () => {
    const updatedTasks = tasks.map((task, i) => (i === editIndex ? taskInput : task));
    setTasks(updatedTasks);
    setTaskInput({ name: '', description: '' });
    setEditMode(false);
    setEditIndex(null);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="task-form">
        <input
          type="text"
          name="name"
          placeholder="Task Name"
          value={taskInput.name}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Task Description"
          value={taskInput.description}
          onChange={handleInputChange}
        ></textarea>
        {editMode ? (
          <button onClick={saveEdit}>Save</button>
        ) : (
          <button onClick={addTask}>Add Task</button>
        )}
      </div>
      <div className="task-list">
        {tasks.map((task, index) => (
          <div key={index} className="task-item">
            <div>
              <h3>{task.name}</h3>
              <p>{task.description}</p>
            </div>
            <div>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
