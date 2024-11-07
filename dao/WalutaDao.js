const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./my_database.db');

class WalutaDao {
    static async create(waluta) {
        const { id, symbol_unicode, nazwa, kraj } = waluta;
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO Waluta (id, symbol_unicode, nazwa, kraj) VALUES (?, ?, ?, ?)`,
                [id, symbol_unicode, nazwa, kraj],
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
            db.all(`SELECT * FROM Waluta`, [], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }

    static async findById(id) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM Waluta WHERE id = ?`, [id], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });
    }

    static async update(waluta) {
        const { id, symbol_unicode, nazwa, kraj } = waluta;
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE Waluta SET symbol_unicode = ?, nazwa = ?, kraj = ? WHERE id = ?`,
                [symbol_unicode, nazwa, kraj, id],
                function (err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(this.changes);
                }
            );
        });
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM Waluta WHERE id = ?`, [id], function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(this.changes);
            });
        });
    }
}

module.exports = WalutaDao;