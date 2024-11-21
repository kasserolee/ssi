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


    // API
    async getAll(req, res) {
        try{
            const waluty = await this.all();
            res.status(200).json(waluty);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async create(req, res) {
        try{
            const waluta = req.body;
            const id = await waluta_dao.create(waluta);
            res.status(201).json({message: "Waluta została dodana", id});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async update(req, res) {
        try {
            const {id} = req.params;
            const waluta = {...req.body, id: parseInt(id)};
            const changes = await waluta_dao.update(waluta);
            if(changes>0) {
                res.status(200).json({message: "Waluta została zaktualizowana."});
            } else {
                res.status(404).json({message: "Waluta nie została znaleziona."});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }


    async delete(req, res) {
        try {
            const {id} = req.params;
            const changes = await waluta_dao.delete(parseInt(id));
            if(changes > 0) {
                res.status(200).json({message: "Waluta została usunięta."});
            } else {
                res.status(404).json({message: "Waluta nie została znaleziona."});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }


    async patch(req, res) {
        try {
            const {id} = req.params;
            const updateData = req.body;
            const waluta = await waluta_dao.findById(id);

            if(!waluta) {
                return res.status(404).json({message: "Waluta nie została znaleziona."});
            }

            const updatedWaluta = {
                ...waluta,
                ...updateData
            };

            const changes = await waluta_dao.update(updatedWaluta);

            if(changes > 0) {
                res.status(200).json({message: "Waluta została zaktualizowana"});
            } else {
                res.status(400).json({message: "Brak zmian w danych"});
            }
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }


    async getBySymbol(req, res) {
        try {
            const {symbol} = req.params;
            const waluta = await waluta_dao.findBySymbol(symbol);
            if(waluta) {
                res.status(200).json(waluta);
            } else {
                res.status(404).json({message: "Waluta o podanym symbolu nie została znaleziona."});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }


    async getByName(req, res) {
        try {
            const {nazwa} = req.params;
            const waluta = await waluta_dao.findByNazwa(nazwa);
            if(waluta){
                res.status(200).json(waluta);
            } else {
                res.status(404).json({message: "Waluta o podanej nazwie nie została znaleziona."});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }


    async getByCountry(req, res) {
        try {
            const {kraj} = req.params;
            const waluty = await waluta_dao.findByCountry(kraj);
            if(waluty) {
                res.status(200).json(waluty);
            } else {
                res.status(404).json({message: "Brak walut w podanym kraju."});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

}

module.exports = WalutaController;