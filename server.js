const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');

const app = express();
const PORT = 3000;

const users = { 'admin': 'supersecret' };

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic authentication middleware
app.use(basicAuth({
  users,
  challenge: true,
  unauthorizedResponse: 'Unauthorized access.'
}));

// Mock database (in-memory for simplicity)
let tasks = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: true }
];

// CRUD operations
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;
  tasks = tasks.map(task => (task.id === taskId ? updatedTask : task));
  res.json(updatedTask);
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);
  res.json({ message: 'Task deleted successfully.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
