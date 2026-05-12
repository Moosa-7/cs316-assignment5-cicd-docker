const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'todo_user',
  password: process.env.DB_PASS || 'yourpassword',
  database: process.env.DB_NAME || 'todo_db'
});

db.connect(err => {
  if (err) { console.error('DB connection failed:', err); return; }
  console.log('Connected to MariaDB');
});

// Routes
app.get('/api/todos', (req, res) => {
  db.query('SELECT * FROM todos', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  db.query('INSERT INTO todos (title) VALUES (?)', [title], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, title, completed: false });
  });
});

app.put('/api/todos/:id', (req, res) => {
  const { completed } = req.body;
  db.query('UPDATE todos SET completed=? WHERE id=?', [completed, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Updated' });
  });
});

app.delete('/api/todos/:id', (req, res) => {
  db.query('DELETE FROM todos WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Deleted' });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
