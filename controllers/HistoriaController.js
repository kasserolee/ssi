const historia_dao = require("../dao/HistoriaDao")

class HistoriaController{
    async save_historia(historia){
        await historia_dao.create(historia); //TODO duplikacja dat
        return "ok"
    }

    async all(){
        return await historia_dao.findAll();
    }

    async get_historia_waluta_data_od_do(id, data_od, data_do){ //TODO formatowanie dat
        return await historia_dao.findByDataRange(id, data_od, data_do);
    }

    async get_historia_waluta(id){
        return await historia_dao.findByIdWaluty(id);
    }

    async get_historia_waluta_last(id){
        let waluta = await historia_dao.findByIdWaluty(id);
        return waluta[waluta.length-1];
    }

    async get_historia_data(data){ //TODO formatowanie dat
        return await historia_dao.findByData(data);
    }

    async update_historia(historia){
        await historia_dao.update(historia) //TODO duplikacja dat
    }

    async delete_historia(id){
        await historia_dao.delete(id);
        return "ok"
    }
}

module.exports = HistoriaController;