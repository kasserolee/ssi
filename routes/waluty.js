const express = require('express');
const router = express.Router();
const WalutaController = require("../controllers/WalutaController");
const walutaController = new WalutaController();
const HistoriaController = require("../controllers/HistoriaController").prototype;


router.get("/", async (req, res) => {
    let waluty = await walutaController.all();
    for (let i = 0; i < waluty.length; i++) {
        let his = await HistoriaController.get_historia_waluta_last(waluty[i].id)
        if (his !== undefined) waluty[i].kurs = his.kurs;
    }
    res.send(waluty);
});
router.get("/symbol/:symbol", walutaController.getBySymbol.bind(walutaController));
router.get("/nazwa/:nazwa", walutaController.getByName.bind(walutaController));
router.get("/kraj/:kraj", walutaController.getByCountry.bind(walutaController));
router.get("/:id", async (req, res) => {
    let waluta = await walutaController.get_waluta(req.params.id);
    if (!waluta){
        res.status(404).send();
        return 0;
    }
    let historia = await HistoriaController.get_historia_waluta(req.params.id);
    res.send({waluta, historia});
})
router.post("/", walutaController.create);
router.put("/:id", walutaController.update);
router.delete("/:id", walutaController.delete);
router.patch("/:id", walutaController.patch);


module.exports = router;