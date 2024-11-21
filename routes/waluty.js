const express = require('express');
const router = express.Router();
const WalutaController = require("../controllers/WalutaController");
const walutaController = new WalutaController();


router.get("/", walutaController.getAll.bind(walutaController));
router.get("/symbol/:symbol", walutaController.getBySymbol.bind(walutaController));
router.get("/nazwa/:nazwa", walutaController.getByName.bind(walutaController));
router.get("/kraj/:kraj", walutaController.getByCountry.bind(walutaController));
router.post("/", walutaController.create);
router.put("/:id", walutaController.update);
router.delete("/:id", walutaController.delete);
router.patch("/:id", walutaController.patch);


module.exports = router;