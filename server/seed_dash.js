const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'cgu_security.db');
const db = new sqlite3.Database(dbPath);

const visitors = [
    { name: "Rahul Verma (Guest)", purpose: "Alumni Meet", phone: "9871112233", status: "Checked In" },
    { name: "Pooja Singh (Parent)", purpose: "Visiting daughter in Girls Hostel", phone: "9872223344", status: "Checked In" },
    { name: "Ashok Das (Vendor)", purpose: "Cafeteria Maintenance", phone: "9873334455", status: "Checked Out" },
    { name: "Kiran Sethi (Parent)", purpose: "Fee Submission Enquiry", phone: "9874445566", status: "Checked In" },
    { name: "Suresh Gupta (Contractor)", purpose: "Electrical Repairs at BS Building", phone: "9875556677", status: "Checked In" },
    { name: "Rina Das (Parent)", purpose: "Meeting HOD of Mechanical", phone: "9876667788", status: "Checked Out" }
];

const incidents = [
    { title: "Bicycle theft reported", description: "A student reported their bicycle missing from the CS Building parking.", location: "CS Building Parking", severity: "High" },
    { title: "Minor scuffle", description: "Argument between students sorted out by guard.", location: "MBA Gallery", severity: "Low" },
    { title: "Water leakage", description: "Pipe burst in bathroom.", location: "Electrical Building", severity: "Medium" },
    { title: "Unauthorized entry", description: "Unknown person tried entering through back gate without ID.", location: "Back Gate", severity: "High" },
    { title: "Glass door broken", description: "Glass door shattered due to wind.", location: "RIHC Auditorium", severity: "Medium" }
];

const lostFound = [
    { itemDescription: "Dell 65W laptop charger", location: "BS Building", contactInfo: "NIL" },
    { itemDescription: "Casio fx-991EX Calculator", location: "Electrical Building", contactInfo: "Aditya" },
    { itemDescription: "Black folding umbrella", location: "CS Building", contactInfo: "NIL" },
    { itemDescription: "Physics notes, 2nd semester", location: "MBA Gallery", contactInfo: "NIL" }
];

const leaves = [
    { name: "Akash Sharma", regId: "CGU2021001", semester: "4th", branch: "CSE", reason: "Medical Leave", startDate: "2026-10-06", expectedReturnDate: "2026-10-10", status: "Pending Departure" },
    { name: "Sneha Patel", regId: "CGU2021045", semester: "6th", branch: "ECE", reason: "Family Function", startDate: "2026-10-02", expectedReturnDate: "2026-10-06", status: "On Leave" },
    { name: "Rohan Das", regId: "CGU2021089", semester: "8th", branch: "MECH", reason: "Job Interview", startDate: "2026-10-04", expectedReturnDate: "2026-10-05", status: "Returned" }
];

db.serialize(() => {
    let v = 0, i = 0, lf = 0, l = 0;
    
    visitors.forEach(x => {
        db.run(`INSERT INTO Visitors (name, purpose, phone, status) VALUES (?, ?, ?, ?)`, [x.name, x.purpose, x.phone, x.status]);
        v++;
    });

    incidents.forEach(x => {
        db.run(`INSERT INTO Incidents (title, description, location, severity) VALUES (?, ?, ?, ?)`, [x.title, x.description, x.location, x.severity]);
        i++;
    });

    lostFound.forEach(x => {
        db.run(`INSERT INTO LostAndFound (itemDescription, location, contactInfo, status) VALUES (?, ?, ?, 'Unclaimed')`, [x.itemDescription, x.location, x.contactInfo]);
        lf++;
    });

    leaves.forEach(x => {
        db.run(`INSERT INTO StudentLeaves (name, regId, semester, branch, reason, startDate, expectedReturnDate, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [x.name, x.regId, x.semester, x.branch, x.reason, x.startDate, x.expectedReturnDate, x.status]);
        l++;
    });

    // Clock in a few guards to make dashboard numbers pop
    db.run(`UPDATE GuardShifts SET status = 'On Duty', inTime = CURRENT_TIMESTAMP WHERE id IN (1, 3, 5, 7)`);

    console.log(`Seeded extra data: ${v} visitors, ${i} incidents, ${lf} items, ${l} leaves.`);
});
