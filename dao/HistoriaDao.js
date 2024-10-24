const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./my_database.db');

class HistoriaDao {
    static async create(historia) {
        const { id_waluty, data, kurs } = historia;
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO Historia (id_waluty, data, kurs) VALUES (?, ?, ?)`,
                [id_waluty, data, kurs],
                function (err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(this.lastID);
                }
            );
        });
    }

    static async findAll() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM Historia`, [], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }

    static async findById(id) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM Historia WHERE id = ?`, [id], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM Historia WHERE id = ?`, [id], function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(this.changes);
            });
        });
    }
}

module.exports = HistoriaDao;