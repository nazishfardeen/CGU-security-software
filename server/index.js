const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// -- VISITOR ROUTES --

app.get('/api/visitors', (req, res) => {
    db.all("SELECT * FROM Visitors ORDER BY checkInTime DESC", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

app.post('/api/visitors', (req, res) => {
    const { name, purpose, phone } = req.body;
    db.run(
        `INSERT INTO Visitors (name, purpose, phone) VALUES (?, ?, ?)`,
        [name, purpose, phone],
        function(err) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID, name, purpose, phone, status: 'Checked In' });
        }
    );
});

app.patch('/api/visitors/:id/checkout', (req, res) => {
    const { id } = req.params;
    db.run(
        `UPDATE Visitors SET status = 'Checked Out', checkOutTime = CURRENT_TIMESTAMP WHERE id = ?`,
        [id],
        function(err) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({ message: "Visitor checked out successfully", changes: this.changes });
        }
    );
});

// -- INCIDENT ROUTES --

app.get('/api/incidents', (req, res) => {
    db.all("SELECT * FROM Incidents ORDER BY reportedAt DESC", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

app.post('/api/incidents', (req, res) => {
    const { title, description, location, severity } = req.body;
    db.run(
        `INSERT INTO Incidents (title, description, location, severity) VALUES (?, ?, ?, ?)`,
        [title, description, location, severity],
        function(err) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID, title, description, location, severity });
        }
    );
});

// -- LOST AND FOUND ROUTES --

app.get('/api/lost-found', (req, res) => {
    db.all("SELECT * FROM LostAndFound ORDER BY reportedAt DESC", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

app.post('/api/lost-found', (req, res) => {
    const { itemDescription, location, contactInfo } = req.body;
    db.run(
        `INSERT INTO LostAndFound (itemDescription, location, contactInfo) VALUES (?, ?, ?)`,
        [itemDescription, location, contactInfo],
        function(err) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID, itemDescription, location, contactInfo, status: 'Unclaimed' });
        }
    );
});

app.patch('/api/lost-found/:id/claim', (req, res) => {
    const { id } = req.params;
    db.run(
        `UPDATE LostAndFound SET status = 'Claimed' WHERE id = ?`,
        [id],
        function(err) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({ message: "Item claimed successfully", changes: this.changes });
        }
    );
});

// -- STUDENT LEAVES ROUTES --

app.get('/api/student-leaves', (req, res) => {
    db.all("SELECT * FROM StudentLeaves ORDER BY id DESC", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

app.post('/api/student-leaves', (req, res) => {
    const { name, regId, semester, branch, reason, startDate, expectedReturnDate } = req.body;
    db.run(
        `INSERT INTO StudentLeaves (name, regId, semester, branch, reason, startDate, expectedReturnDate) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, regId, semester, branch, reason, startDate, expectedReturnDate],
        function(err) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID, name, regId, semester, branch, reason, startDate, expectedReturnDate, status: 'Pending Departure' });
        }
    );
});

app.patch('/api/student-leaves/:id/depart', (req, res) => {
    const { id } = req.params;
    db.run(
        `UPDATE StudentLeaves SET status = 'On Leave', actualDeparture = CURRENT_TIMESTAMP WHERE id = ?`,
        [id],
        function(err) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({ message: "Student departed successfully", changes: this.changes });
        }
    );
});

app.patch('/api/student-leaves/:id/return', (req, res) => {
    const { id } = req.params;
    db.run(
        `UPDATE StudentLeaves SET status = 'Returned', actualReturn = CURRENT_TIMESTAMP WHERE id = ?`,
        [id],
        function(err) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({ message: "Student returned successfully", changes: this.changes });
        }
    );
});

// -- EMERGENCY CONTACTS ROUTES --
app.get('/api/emergency-contacts', (req, res) => {
    db.all("SELECT * FROM EmergencyContacts", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ data: rows });
    });
});

app.post('/api/emergency-contacts', (req, res) => {
    const { name, role, phone } = req.body;
    db.run(
        `INSERT INTO EmergencyContacts (name, role, phone) VALUES (?, ?, ?)`,
        [name, role, phone],
        function(err) {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ id: this.lastID, name, role, phone });
        }
    );
});

// -- BROADCASTS ROUTES --
app.get('/api/broadcasts', (req, res) => {
    db.all("SELECT * FROM Broadcasts ORDER BY sentAt DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ data: rows });
    });
});

app.post('/api/broadcasts', (req, res) => {
    const { message, type } = req.body;
    db.run(
        `INSERT INTO Broadcasts (message, type) VALUES (?, ?)`,
        [message, type],
        function(err) {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ id: this.lastID, message, type });
        }
    );
});

// -- GUARD SHIFTS ROUTES --
app.get('/api/guard-shifts', (req, res) => {
    db.all("SELECT * FROM GuardShifts ORDER BY id DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ data: rows });
    });
});

app.post('/api/guard-shifts', (req, res) => {
    const { name, badgeNumber, location, shiftType } = req.body;
    db.run(
        `INSERT INTO GuardShifts (name, badgeNumber, location, shiftType) VALUES (?, ?, ?, ?)`,
        [name, badgeNumber, location, shiftType],
        function(err) {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ id: this.lastID, name, badgeNumber, location, shiftType, status: 'Off Duty' });
        }
    );
});

app.patch('/api/guard-shifts/:id/in', (req, res) => {
    const { id } = req.params;
    db.run(
        `UPDATE GuardShifts SET status = 'On Duty', inTime = CURRENT_TIMESTAMP WHERE id = ?`,
        [id],
        function(err) {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ message: "Guard clocked in successfully", changes: this.changes });
        }
    );
});

app.patch('/api/guard-shifts/:id/out', (req, res) => {
    const { id } = req.params;
    db.run(
        `UPDATE GuardShifts SET status = 'Off Duty', exitTime = CURRENT_TIMESTAMP WHERE id = ?`,
        [id],
        function(err) {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ message: "Guard clocked out successfully", changes: this.changes });
        }
    );
});

// -- DASHBOARD STATS ROUTE --
app.get('/api/stats', (req, res) => {
    db.get("SELECT COUNT(*) as activeVisitors FROM Visitors WHERE status = 'Checked In'", [], (err, visitorRow) => {
        db.get("SELECT COUNT(*) as totalIncidents FROM Incidents", [], (err, incidentRow) => {
            db.get("SELECT COUNT(*) as guardsOnDuty FROM GuardShifts WHERE status = 'On Duty'", [], (err, guardRow) => {
                db.get("SELECT COUNT(*) as activeLeaves FROM StudentLeaves WHERE status = 'On Leave'", [], (err, leaveRow) => {
                    db.get("SELECT COUNT(*) as unresolvedItems FROM LostAndFound WHERE status = 'Unclaimed'", [], (err, lfRow) => {
                        res.json({
                            activeVisitors: visitorRow.activeVisitors,
                            totalIncidents: incidentRow.totalIncidents,
                            guardsOnDuty: guardRow.guardsOnDuty,
                            activeLeaves: leaveRow.activeLeaves,
                            unresolvedItems: lfRow.unresolvedItems,
                            campusStatus: incidentRow.totalIncidents > 20 ? 'Elevated' : 'Secure'
                        });
                    });
                });
            });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
