const xlsx = require('xlsx');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'cgu_security.db');
const db = new sqlite3.Database(dbPath);

try {
    const workbook = xlsx.readFile('C:/Users/nazis/OneDrive/Desktop/Software Case Study list (GRP 8).xlsx');
    const sheetName = workbook.SheetNames[0];
    const rawData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    
    // Skip row 0 as it contains the real headers
    const students = rawData.slice(1).map(row => {
        return {
            regId: row['Software Engineering – Team Details'],
            name: row['__EMPTY']
        };
    }).filter(s => s.regId && s.name && s.name !== 'Name of the Student' && s.regId !== 'Registration Number');
    
    db.serialize(() => {
        let inserted = 0;
        students.forEach((s, idx) => {
            // Distribute students as sample data across the system
            if (idx % 3 === 0) {
                // Add to Student Leaves
                db.run(
                    `INSERT INTO StudentLeaves (name, regId, semester, branch, reason, startDate, expectedReturnDate, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [s.name, String(s.regId), '6', 'CSE', 'Family Function', '2026-10-06', '2026-10-15', 'Pending Departure']
                );
            } else if (idx % 3 === 1) {
                // Add to Student Leaves as On Leave
                 db.run(
                    `INSERT INTO StudentLeaves (name, regId, semester, branch, reason, startDate, expectedReturnDate, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [s.name, String(s.regId), '4', 'IT', 'Medical Leave', '2026-10-01', '2026-10-10', 'On Leave']
                );
            } else {
                // Add to Visitors just to populate that table too (simulate students visiting as guests or something)
                db.run(
                    `INSERT INTO Visitors (name, purpose, phone, status) VALUES (?, ?, ?, ?)`,
                    [s.name, 'Group Discussion', '9876543210', 'Checked In']
                );
            }
            inserted++;
        });
        console.log(`Successfully populated database with ${inserted} student records from the Excel sheet!`);
    });
} catch (e) {
    console.error(e);
}
