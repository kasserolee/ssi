const uzytkownik_dao = require("../dao/UzytkownikDao")

class UzytkownikController {
    async save_uzytkownik(uzytkownik){
        let login_ok = await uzytkownik_dao.findByLogin(uzytkownik.login)
        let email_ok = await uzytkownik_dao.findByEmail(uzytkownik.email)
        if (login_ok != null) return "login";
        if (email_ok != null) return "email";
        else {
            uzytkownik.stan_konta = "użytkownik";
            await uzytkownik_dao.create(uzytkownik);
            return "ok";
        }
    }

    async all() {
        return await uzytkownik_dao.findAll()
    }

    async get_uzytkownik(id){
        return await uzytkownik_dao.findById(id)
    }

    async get_uzytkownik_by_login(login){
        return await uzytkownik_dao.findByLogin(login)
    }

    async update_uzytkownik(uzytkownik){
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

    async na_serio_delete_uzytkownik(id){
        await uzytkownik_dao.delete(id)
        return "ok"
    }


    async authenticate(login, haslo){
        const user = await uzytkownik_dao.findByLogin(login);

        if(user && user.haslo === haslo && user.stan_konta !== "zablokowany" && user.stan_konta !== "usunięty"){
            return user;
        }

        return null;
    }
}

module.exports = UzytkownikController;