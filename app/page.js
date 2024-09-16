"use client"
import { useState } from 'react';
import Head from 'next/head';

export default function TaskInputPage() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [prioritizedTasks, setPrioritizedTasks] = useState([]);

  const handleAddTask = () => {
    if (inputValue.trim()) {
      setTasks((prevTasks) => [...prevTasks, inputValue]);
      setInputValue('');
    }
  };

  const handleSubmit = async () => {
    if (tasks.length === 0) return;

    try {
      const response = await fetch('/api/prioritize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks })
      });

      if (response.ok) {
        const data = await response.json();
        setPrioritizedTasks(data.prioritizedTasks || []);
      } else {
        console.error('Failed to fetch prioritized tasks');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <Head>
        <title>Task Prioritization App</title>
      </Head>

      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Task Input</h1>
        
        <div className="mb-4">
          <input 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder="Enter a task" 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex justify-between mb-4">
          <button 
            onClick={handleAddTask} 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition duration-200"
          >
            Add Task
          </button>
          <button 
            onClick={handleSubmit} 
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition duration-200"
          >
            Prioritize Tasks
          </button>
        </div>

        <h2 className="text-xl font-medium text-gray-700 mt-6">Entered Tasks</h2>
        <ul className="list-disc list-inside">
          {tasks.map((task, index) => (
            <li key={index} className="flex items-center justify-between text-gray-600 mb-2">
              {task}
              <button 
                onClick={() => handleDeleteTask(index)} 
                className="ml-4 text-red-600 hover:text-red-500 transition duration-200"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {prioritizedTasks.length > 0 && (
          <>
            <h2 className="text-xl font-medium text-gray-700 mt-6">Prioritized Tasks</h2>
            <ul className="list-decimal list-inside">
              {prioritizedTasks.map((task, index) => (
                <li key={index} className="text-gray-600 mb-2">{task}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
