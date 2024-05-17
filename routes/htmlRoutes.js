const express = require('express');
const router = express.Router();
const path = require('path'); // Ensure 'path' module is imported

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/notes.html'));
});

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

module.exports = router;
