const db = require('./db');

const guards = [
    { name: "Ramesh Kumar", badgeNumber: "CGU-G001", location: "BS Building", shiftType: "Day" },
    { name: "Suresh Singh", badgeNumber: "CGU-G002", location: "MBA Gallery", shiftType: "Night" },
    { name: "Ravi Shankar", badgeNumber: "CGU-G003", location: "RIHC", shiftType: "Day" },
    { name: "Kishan Yadav", badgeNumber: "CGU-G004", location: "Front Gate", shiftType: "Night" },
    { name: "Amit Sharma", badgeNumber: "CGU-G005", location: "Back Gate", shiftType: "Day" },
    { name: "Brijesh Patel", badgeNumber: "CGU-G006", location: "Hostel Caretaker (Boys)", shiftType: "Night" },
    { name: "Sanjay Das", badgeNumber: "CGU-G007", location: "Hostel Caretaker (Girls)", shiftType: "Day" }
];

const contacts = [
    { name: "Dr. A. K. Mohanty", role: "Chief Security Officer", phone: "9876543210" },
    { name: "Local Police Station", role: "Emergency Services", phone: "100" },
    { name: "Campus Ambulance", role: "Medical Emergency", phone: "108" },
    { name: "Fire Department", role: "Fire Emergency", phone: "101" }
];

setTimeout(() => {
    db.serialize(() => {
        let gCount = 0;
        guards.forEach(g => {
            db.run(
                `INSERT INTO GuardShifts (name, badgeNumber, location, shiftType, status) VALUES (?, ?, ?, ?, 'Off Duty')`,
                [g.name, g.badgeNumber, g.location, g.shiftType]
            );
            gCount++;
        });

        let cCount = 0;
        contacts.forEach(c => {
            db.run(
                `INSERT INTO EmergencyContacts (name, role, phone) VALUES (?, ?, ?)`,
                [c.name, c.role, c.phone]
            );
            cCount++;
        });

        console.log(`Inserted ${gCount} guards and ${cCount} contacts.`);
    });
}, 1000);
