const express = require('express');
const router = express.Router();
const WalutaController = require("../controllers/WalutaController");
const walutaController = new WalutaController();
const UlubioneController = require("../controllers/UlubioneController").prototype;

router.post("/", async (req, res) => {
    let cookies = req.signedCookies;
    if (cookies["id"] === undefined || cookies["id"] === false){
        res.status(403).send();
        return 0;
    }
    let ulubione = await UlubioneController.uzytkownik_ulubione(cookies["id"]);
    if (ulubione) {
        res.send([ulubione]);
    }
    res.send();
})

router.post("/add/:id", async (req, res) => {
    let cookies = req.signedCookies;
    let id = req.params.id;
    if (cookies["id"] === undefined || cookies["id"] === false){
        res.status(403).send();
        return 0;
    }
    await UlubioneController.save_ulubione({id_waluty: id, id_uzytkownika: cookies["id"]});
    res.send("ok");
})

router.post("/remove/:id", async (req, res) => {
    let cookies = req.signedCookies;
    let id = req.params.id;
    if (cookies["id"] === undefined || cookies["id"] === false){
        res.status(403).send();
        return 0;
    }
    await UlubioneController.uzytkownik_waluta_delete(id, cookies["id"]);
    res.send("ok");
})

module.exports = router;