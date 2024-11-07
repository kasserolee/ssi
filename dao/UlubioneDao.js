const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./my_database.db');

class UlubioneDao {
    static async create(ulubione) {
        const { id_uzytkownika, id_waluty } = ulubione;
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO Ulubione (id_uzytkownika, id_waluty) VALUES (?, ?)`,
                [id_uzytkownika, id_waluty],
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
            db.all(`SELECT * FROM Ulubione`, [], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }

    static async findById(id) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM Ulubione WHERE id = ?`, [id], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });
    }

    static async findByIdUzytkownika(id) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM Ulubione WHERE id_uzytkownika = ?`, [id], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });
    }

    static async findByIdWaluty(id) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM Ulubione WHERE id_waluty = ?`, [id], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });
    }

    static async findIdUzytkownikaIdWaluty(id_uzytkownika, id_waluty) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT id FROM Ulubione WHERE id_uzytkownika = ? and id_waluty = ?`, [id_uzytkownika, id_waluty], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM Ulubione WHERE id = ?`, [id], function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(this.changes);
            });
        });
    }
}

module.exports = UlubioneDao;