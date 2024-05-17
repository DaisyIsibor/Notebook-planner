const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

//get request for the note
router.get('/api/notes', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        try {
            const notes = JSON.parse(data);
            res.json(notes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error parsing JSON data' });
        }
    });
});

// POST /api/notes - Receive a new note to save on the request body, add it to the db.json file, and return the new note to the client
router.post('/api/notes', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const notes = JSON.parse(data);
        const newNote = {
            id: uuidv4(),
            title: req.body.title,
            text: req.body.text
        };
        notes.push(newNote);
        fs.writeFile('db.json', JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.json(newNote);
        });
    });
});

// DELETE /api/notes/:id - Receive a query parameter that contains the id of a note to delete, delete the note with the given id from db.json
router.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        let notes = JSON.parse(data);
        notes = notes.filter(note => note.id !== noteId);
        fs.writeFile('db.json', JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.json({ message: 'Note deleted successfully' });
        });
    });
});

module.exports = router;
