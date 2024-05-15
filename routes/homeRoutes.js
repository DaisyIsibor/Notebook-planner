const express = require('express');
const router = express.Router();
const path = require('path');

// HTML Routes
router.get('/notes', (req, res) => {
res.sendFile(path.join(__dirname, '..', 'public', 'notes.html'));
});
// Catch-all route handler: Sends the index.html file for any unmatched GET request.
// This is useful for single-page applications (SPAs) where the front-end framework handles client-side routing.
router.get('*', (req, res) => {
res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = router;