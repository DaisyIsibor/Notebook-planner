const express = require('express');
const path = require('path');
const fs = require('fs');
const api = require('./routes/index.js');


const PORT = 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));
// Import route files
const noteRoutes = require('./routes/noteRoutes');
const homeRoutes = require('./routes/homeRoutes');

// Use routes
app.use('/api/notes', noteRoutes);
app.use('/', homeRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});
