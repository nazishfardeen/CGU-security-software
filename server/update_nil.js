const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'cgu_security.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run(
        `UPDATE LostAndFound SET contactInfo = 'NIL' WHERE itemDescription LIKE '%Water Bottle%' OR itemDescription LIKE '%Umbrella%'`,
        function(err) {
            if (err) {
                console.error(err);
            } else {
                console.log(`Updated ${this.changes} items to have 'NIL' contact info.`);
            }
        }
    );
});
