const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./my_database.db');


class UzytkownikDao {
    static async create(uzytkownik) {
        const {login, haslo, stan_konta, imie, nazwisko, email} = uzytkownik;
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO Uzytkownik (login, haslo, stan_konta, imie, nazwisko, email) VALUES (?, ?, ?, ?, ?, ?)`,
                [login, haslo, stan_konta, imie, nazwisko, email],
                function (err){
                    if(err){
                        return reject(err);
                    }
                    resolve(this.lastID);
                }
            );
        });
    }


    static async findAll(){
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM Uzytkownik`, [], (err, rows) => {
                if(err){
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }

    static async findById(id) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT *
                    FROM Uzytkownik
                    WHERE id = ?`, [id], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });
    }

    static async findByEmail(email) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT *
                    FROM Uzytkownik
                    WHERE email = ?`, [email], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });
    }

    static async findByLogin(login){
        return new Promise((resolve, reject) => {
            db.get(
                `SELECT id from Uzytkownik where login = ?`,
                [login],
                    (err, row) => {
                    if(err){
                        return reject(err);
                    }
                    resolve(row);
                });
        });
    }


    static async update(uzytkownik){
        const {id, login, haslo, stan_konta, imie, nazwisko, email} = uzytkownik;
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE Uzytkownik SET login = ?, haslo = ?, stan_konta = ?, imie = ?, nazwisko = ?, email = ? WHERE id = ?`,
                [login, haslo, stan_konta, imie, nazwisko, email, id],
                function (err) {
                    if(err){
                        return reject(err);
                    }
                    resolve(this.changes);
                });
        });
    }


    static async delete(id){
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM Uzytkownik WHERE id = ?`, [id],
                function (err) {
                if(err){
                    return reject(err);
                }
                resolve(this.changes);
            });
        });
    }

}

module.exports = UzytkownikDao;