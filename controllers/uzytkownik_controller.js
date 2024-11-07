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
        let old_uzytkownik = await uzytkownik_dao.findById(uzytkownik.id)
        uzytkownik.id = old_uzytkownik.id;
        let login_ok = await uzytkownik_dao.findByLogin(uzytkownik.login)
        let email_ok = await uzytkownik_dao.findByEmail(uzytkownik.email)
        if (login_ok != null && login_ok.id !== uzytkownik.id){
            return "login"
        }
        if (email_ok != null && email_ok.id !== uzytkownik.id){
            return "email"
        }
        await uzytkownik_dao.update(uzytkownik);
        return "ok"
    }

    async block_uzytkownik(id){
        let uzytkownik = await uzytkownik_dao.findById(id);
        uzytkownik.stan_konta = "zablokowany"
        uzytkownik.imie = "zablokowany"
        uzytkownik.nazwisko = "zablokowany"
        await uzytkownik_dao.update(uzytkownik)
        return "ok"
    }

    async delete_uzytkownik(id){
        let uzytkownik = await uzytkownik_dao.findById(id);
        uzytkownik.stan_konta = "usunięty";
        uzytkownik.imie = "usunięty";
        uzytkownik.nazwisko = "usunięty";
        await uzytkownik_dao.update(uzytkownik)
        return "ok"
    }
}

module.exports = Uzytkownik_controller;