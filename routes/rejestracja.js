const express = require('express');
const router = express.Router();
const uzytkownik_controller = require("../controllers/UzytkownikController").prototype
const uzytkownik_dto = require("../dto/UzytkownikDto")

router.get('/', (req, res) => {
    res.send({status: "ready"});
});

router.post('/', async (req, res) => {
    let x = await uzytkownik_controller.save_uzytkownik(req.body);
    if (x === "ok") {
        let user = uzytkownik_controller.get_uzytkownik();
        res.cookie("stan_konta", user.stan_konta, {signed: true})
        res.cookie("id", user.id, {signed: true});
    }
    res.send({status: x})
})

module.exports = router;