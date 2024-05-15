//requirements 
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// API Routes
router.get('/', (req, res) => {
  // Read notes from JSON file and send as response

fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) {

    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(JSON.parse(data));
});
});

router.post('/', (req, res) => {

  // Receive a new note to save on the server
const newNote = req.body;

  newNote.id = uuidv4(); // Assign a unique ID to the new note

fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
    }
    const notes = JSON.parse(data);

    notes.push(newNote);

    fs.writeFile(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), (err) => {
    if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(newNote);
    });
});
});

router.delete('/:id', (req, res) => {
const noteId = req.params.id;

fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
    }

    let notes = JSON.parse(data);
    notes = notes.filter((note) => note.id !== noteId);
    fs.writeFile(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), (err) => {
    if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ message: 'Note deleted successfully' });
    });
});
});

module.exports = router;