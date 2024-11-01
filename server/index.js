import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';

const app = express();
const db = new Database('reminders.db');

app.use(cors());
app.use(express.json());

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS reminders (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT,
    description TEXT,
    completed BOOLEAN NOT NULL DEFAULT 0,
    color TEXT NOT NULL
  )
`);

// Get all reminders
app.get('/api/reminders', (req, res) => {
  const reminders = db.prepare('SELECT * FROM reminders').all();
  res.json(reminders);
});

// Create a reminder
app.post('/api/reminders', (req, res) => {
  const { id, title, date, time, description, completed, color } = req.body;
  const stmt = db.prepare(`
    INSERT INTO reminders (id, title, date, time, description, completed, color)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(id, title, date, time, description, completed, color);
  res.status(201).json({ message: 'Reminder created' });
});

// Update reminder completion status
app.patch('/api/reminders/:id', (req, res) => {
  const { completed } = req.body;
  const stmt = db.prepare('UPDATE reminders SET completed = ? WHERE id = ?');
  stmt.run(completed, req.params.id);
  res.json({ message: 'Reminder updated' });
});

// Delete a reminder
app.delete('/api/reminders/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM reminders WHERE id = ?');
  stmt.run(req.params.id);
  res.json({ message: 'Reminder deleted' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});