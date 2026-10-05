const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'cgu_security.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run(`DELETE FROM EmergencyContacts`);
    
    const contacts = [
        { name: "Prof. (Dr.) Amaresh Chandra Panda", role: "Chief Warden", phone: "cwh@cgu-odisha.ac.in" },
        { name: "CGU Main Security Desk", role: "Campus Security HQ", phone: "0674-6636555" },
        { name: "CGU Emergency Hotline", role: "Urgent Support", phone: "9040272733" },
        { name: "Local Janla Police Station", role: "Police Response", phone: "100" },
        { name: "Campus Medical Center", role: "Ambulance / Medical", phone: "108" }
    ];

    let cCount = 0;
    contacts.forEach(c => {
        db.run(
            `INSERT INTO EmergencyContacts (name, role, phone) VALUES (?, ?, ?)`,
            [c.name, c.role, c.phone]
        );
        cCount++;
    });

    console.log(`Updated ${cCount} authentic emergency contacts.`);
});
