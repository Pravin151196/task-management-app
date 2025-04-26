import { useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const AddTask = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await axios.post('http://localhost:5000/api/tasks', { taskName, description, dueDate }, { 
  //     withCredentials: true 
  //   });
  //   navigate('/');
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/tasks', 
        { taskName, description, dueDate }, 
        { withCredentials: true }
      );
      navigate('/');
    } catch (err) {
      console.error('Error creating task:', err.response ? err.response.data : err.message);
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };
  

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Add Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full p-2 mb-3 border rounded"
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
        <textarea
          className="w-full p-2 mb-3 border rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="w-full p-2 mb-3 border rounded"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
