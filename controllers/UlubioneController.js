const ulubione_dao = require("../dao/UlubioneDao")

class UlubioneController{
    async save_ulubione(ulubione){
        let duplikacja = await ulubione_dao.findIdUzytkownikaIdWaluty(ulubione.id_uzytkownika, ulubione.id_waluty);
        if (duplikacja != null){
            return "duplikacja"
        }
        await ulubione_dao.create(ulubione);
        return "ok"
    }

    async all(){
        return await ulubione_dao.findAll();
    }

    async uzytkownik_ulubione(id){
        return await ulubione_dao.findByIdUzytkownika(id);
    }

    async waluta_ulubione(id){
        return await ulubione_dao.findByIdWaluty(id);
    }

    async uzytkownik_waluta_delete(id_waluty, id_uzytkownika){
        let x = await ulubione_dao.findIdUzytkownikaIdWaluty(id_uzytkownika, id_waluty);
        return await ulubione_dao.delete(x.id);
    }

    async delete_ulubione(id){
        await ulubione_dao.delete(id);
        return "ok"
    }
}

module.exports = UlubioneController;