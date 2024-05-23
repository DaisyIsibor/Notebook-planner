const express = require('express');
const path = require('path');
const apiRoute = require("./routes/apiRoutes");
const htmlRoutes = require('./routes/htmlRoutes');
require('dotenv').config(); // Load environment variables from .env file

const PORT = process.env.PORT || 3001; 
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('frontend'));

app.use(apiRoute);
app.use(htmlRoutes);

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
