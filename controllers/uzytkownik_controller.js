const uzytkownik_dao = require("../dao/UzytkownikDao")

class Uzytkownik_controller{
    async save_uzytkownik(uzytkownik){
        let login_ok = await uzytkownik_dao.findByLogin(uzytkownik.login)
        let email_ok = await uzytkownik_dao.findByEmail(uzytkownik.email)
        if (login_ok != null) return "login";
        if (email_ok != null) return "email";
        else return "ok";
    }

    async all() {
        return await uzytkownik_dao.findAll()
    }

    async update_uzytkownik(uzytkownik){
        await uzytkownik_dao.update(uzytkownik);
    }

    async block_uzytkownik(uzytkownik){
        uzytkownik.stan_konta = "zablokowany"
        uzytkownik.imie = "zablokowany"
        uzytkownik.nazwisko = "zablokowany"
        await uzytkownik_dao.update(uzytkownik)
    }

    async delete_uzytkownik(uzytkownik){
        uzytkownik.stan_konta = "usunięty";
        uzytkownik.imie = "usunięty";
        uzytkownik.nazwisko = "usunięty";
        await uzytkownik_dao.update(uzytkownik);
    }
}

module.exports = Uzytkownik_controller;