const uzytkownik_dao = require("../dao/UzytkownikDao")

class Uzytkownik_controller{
    async save_uzytkownik(uzytkownik){
        return (uzytkownik_dao.findByLogin(uzytkownik).then((value) => {
            if (value == null) {
                uzytkownik.stan_konta = "użytkownik";
                uzytkownik_dao.create(uzytkownik);
                return true;
            } else {
                return false;
            }
        }))
    }

    async all() {
        return await uzytkownik_dao.findAll()
    }

    async update_uzytkownik(uzytkownik){
        await uzytkownik_dao.update(uzytkownik);
    }

    async delete_uzytkownik(uzytkownik){
        uzytkownik.stan_konta = "usunięty";
        uzytkownik.imie = "usunięty";
        uzytkownik.nazwisko = "usunięty";
        await uzytkownik_dao.update(uzytkownik);
    }
}

module.exports = Uzytkownik_controller;