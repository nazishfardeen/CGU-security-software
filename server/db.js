const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'cgu_security.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        // Initialize tables
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS Visitors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                purpose TEXT NOT NULL,
                phone TEXT NOT NULL,
                checkInTime DATETIME DEFAULT CURRENT_TIMESTAMP,
                checkOutTime DATETIME,
                status TEXT DEFAULT 'Checked In'
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS Incidents (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                location TEXT NOT NULL,
                severity TEXT NOT NULL,
                reportedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS LostAndFound (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                itemDescription TEXT NOT NULL,
                location TEXT NOT NULL,
                contactInfo TEXT NOT NULL,
                status TEXT DEFAULT 'Unclaimed',
                reportedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS StudentLeaves (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                regId TEXT NOT NULL,
                semester TEXT NOT NULL,
                branch TEXT NOT NULL,
                reason TEXT NOT NULL,
                startDate DATE NOT NULL,
                expectedReturnDate DATE NOT NULL,
                actualDeparture DATETIME,
                actualReturn DATETIME,
                status TEXT DEFAULT 'Pending Departure'
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS EmergencyContacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                role TEXT NOT NULL,
                phone TEXT NOT NULL
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS Broadcasts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                message TEXT NOT NULL,
                type TEXT NOT NULL,
                sentAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS GuardShifts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                badgeNumber TEXT NOT NULL,
                location TEXT NOT NULL,
                shiftType TEXT NOT NULL,
                inTime DATETIME,
                exitTime DATETIME,
                status TEXT DEFAULT 'Off Duty'
            )`);
        });
    }
});

module.exports = db;
