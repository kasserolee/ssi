const waluta_dao = require('../dao/WalutaDao')

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

    async get_waluta(id){
        return await waluta_dao.findById(id);
    }

    async update_waluta(waluta){
        let nazwa_ok = await waluta_dao.findByNazwa(waluta.nazwa);
        if (nazwa_ok != null && nazwa_ok.id !== waluta.id) return "nazwa";
        await waluta_dao.update(waluta);
        return "ok"
    }

    async delete_waluta(id){
        await waluta_dao.delete(id);
        return "ok"
    }
}

module.exports = WalutaController;