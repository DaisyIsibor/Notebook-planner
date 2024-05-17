const express = require('express');
const path = require('path');
const apiRoute = require("./routes/apiRoutes");
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = 3001;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('frontend'));


app.use(apiRoute)
app.use(htmlRoutes);

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
