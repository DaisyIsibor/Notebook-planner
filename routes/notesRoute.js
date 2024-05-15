//requirements 
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { readDataFromFile, writeDataToFile } = require('../helpers/helpersFile');

// API Routes
router.get('/', (req, res) => {
  // Read notes from JSON file using helper function
  readDataFromFile((err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(data);
  });
});

router.post('/', (req, res) => {
  // Receive a new note to save on the server
  const newNote = req.body;
  newNote.id = uuidv4(); // Assign a unique ID to the new note

  // Read existing notes from JSON file
  readDataFromFile((err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    // Add the new note to the existing data
    data.push(newNote);
    
    // Write the updated data back to the JSON file
    writeDataToFile(data, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(newNote);
    });
  });
});

router.delete('/:id', (req, res) => {
  const noteId = req.params.id;

  // Read existing notes from JSON file
  readDataFromFile((err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    
    // Filter out the note with the specified ID
    const updatedData = data.filter((note) => note.id !== noteId);

    // Write the updated data back to the JSON file
    writeDataToFile(updatedData, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json({ message: 'Note deleted successfully' });
    });
  });
});

module.exports = router;