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

    static async findByIdWaluty(id) {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM Historia WHERE id_waluty = ?`, [id], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }

    static async findByData(id) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM Historia WHERE data = ?`, [data], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });
    }

    static async findByDataRange(id, start, stop) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM Historia WHERE id_waluty = ? and data between ? and ?`, [id, start, stop], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });
    }

    static async update(historia){
        const {id, symbol_unicode, nazwa, kraj} = historia;
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE Historia SET symbol_unicode = ?, nazwa = ?, kraj = ? WHERE id = ?`,
                [symbol_unicode, nazwa, kraj, id],
                function (err) {
                    if(err){
                        return reject(err);
                    }
                    resolve(this.changes);
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