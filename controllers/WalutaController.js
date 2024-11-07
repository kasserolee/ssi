const waluta_dao = require('../dao/WalutaDao')
const uzytkownik_dao = require("../dao/UzytkownikDao");

class WalutaController{
    async save_waluta(waluta){
        let nazwa_ok = await waluta_dao.findByNazwa(waluta.nazwa);
        if (nazwa_ok != null) return "nazwa";
        await waluta_dao.create(waluta);
        return "ok"
    }

    async all() {
        return await waluta_dao.findAll()
    }
}

module.exports = WalutaController;