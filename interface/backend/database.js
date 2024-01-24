const sqlite3 = require('sqlite3').verbose();

// Connect to a database named 'database.db' or create it if it doesn't exist
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

module.exports = db;


db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS documents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT,
        translation TEXT,
        manual_translation TEXT
    )`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Table created');
        }
    });
});