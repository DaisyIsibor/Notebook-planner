const fs = require('fs');
const path = require('path');

const readDataFromFile = (callback) => {
    fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return callback(err, null);
        }
        callback(null, JSON.parse(data));
    });
};

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
