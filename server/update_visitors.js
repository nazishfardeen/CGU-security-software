const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'cgu_security.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    // Clear out the student names that were incorrectly added as visitors
    db.run(`DELETE FROM Visitors`);

    const visitors = [
        { name: "Sanjib Das (Parent)", purpose: "Visiting ill son in Boys Hostel", phone: "9876543211", status: "Checked In" },
        { name: "Anita Mishra", purpose: "Meeting with Placement Cell", phone: "9876543212", status: "Checked Out" },
        { name: "Manoj Kumar", purpose: "Guest Lecturer for CS Department", phone: "9876543213", status: "Checked In" },
        { name: "Prakash Singh", purpose: "Attending Inter-college Cricket Match", phone: "9876543214", status: "Checked In" },
        { name: "Ramesh Patel (Parent)", purpose: "Meeting College Dean", phone: "9876543215", status: "Checked Out" },
        { name: "Sunita Reddy (Parent)", purpose: "Visiting daughter in Girls Hostel", phone: "9876543216", status: "Checked In" },
        { name: "TechMahindra HR Team", purpose: "Campus Placement Drive at RIHC", phone: "9876543217", status: "Checked In" }
    ];

    let count = 0;
    visitors.forEach(v => {
        db.run(
            `INSERT INTO Visitors (name, purpose, phone, status) VALUES (?, ?, ?, ?)`,
            [v.name, v.purpose, v.phone, v.status]
        );
        count++;
    });

    console.log(`Successfully replaced the Visitors table with ${count} realistic external visitors.`);
});
