const fs = require('fs');
const path = require('path');

// Function to read data from the db.json file
const readDataFromFile = (callback) => {
fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) {
    console.error(err);
    return callback(err, null);
    }
    callback(null, JSON.parse(data));
});
};

// Function to write data to the db.json file
const writeDataToFile = (data, callback) => {
fs.writeFile(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(data), (err) => {
    if (err) {
    console.error(err);
    return callback(err);
    }
    callback(null);
});
};

module.exports = { readDataFromFile, writeDataToFile };