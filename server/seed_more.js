const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'cgu_security.db');
const db = new sqlite3.Database(dbPath);

const students = [
    "Rahul Sharma", "Priya Das", "Rohan Gupta", "Sneha Mishra", 
    "Aman Singh", "Neha Patel", "Vikram Jena", "Aditi Rao"
];

const lostItems = [
    { desc: "Blue Milton Water Bottle", loc: "BS Building", contact: "Priya Das" },
    { desc: "Black Umbrella", loc: "CS Building", contact: "Rahul Sharma" },
    { desc: "Casio Scientific Calculator", loc: "Electrical Building", contact: "Vikram Jena" },
    { desc: "Physics Notes Copy", loc: "Library", contact: "Aman Singh" },
    { desc: "HP Laptop Charger", loc: "RIHC Auditorium", contact: "Aditi Rao" },
    { desc: "White Apple Airpods", loc: "MBA Gallery", contact: "Rohan Gupta" },
    { desc: "Brown Leather Wallet", loc: "Mechanical Building", contact: "Neha Patel" }
];

const incidents = [
    { title: "Unauthorized Parking", desc: "A car was found parked in the faculty reserved area.", loc: "Mechanical Building", severity: "Low" },
    { title: "Lost ID Card found", desc: "A student ID card was found near the entrance.", loc: "BS Building", severity: "Low" },
    { title: "Minor altercation", desc: "A small argument broke out between students, resolved quickly.", loc: "Cafeteria", severity: "Medium" },
    { title: "Broken Window Glass", desc: "A window was accidentally broken by a cricket ball.", loc: "Boys Hostel", severity: "Medium" },
    { title: "Fire Alarm Triggered", desc: "False alarm triggered on the 2nd floor.", loc: "CS Building", severity: "High" }
];

db.serialize(() => {
    let countItems = 0;
    lostItems.forEach(item => {
        db.run(
            `INSERT INTO LostAndFound (itemDescription, location, contactInfo, status) VALUES (?, ?, ?, ?)`,
            [item.desc, item.loc, item.contact, Math.random() > 0.5 ? 'Claimed' : 'Unclaimed']
        );
        countItems++;
    });

    let countIncidents = 0;
    incidents.forEach(inc => {
        db.run(
            `INSERT INTO Incidents (title, description, location, severity) VALUES (?, ?, ?, ?)`,
            [inc.title, inc.desc, inc.loc, inc.severity]
        );
        countIncidents++;
    });
    
    console.log(`Inserted ${countItems} lost/found items and ${countIncidents} incidents.`);
});
