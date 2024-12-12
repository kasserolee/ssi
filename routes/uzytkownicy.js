const express = require('express');
const {prototype: uzytkownik_controller} = require("../controllers/UzytkownikController");
const router = express.Router();
const UzytkownikController = require("../controllers/UzytkownikController").prototype;

router.post("/uzytkownik", async (req, res) => {
    let cookies = req.signedCookies;
    if (cookies["id"] === undefined || cookies["id"] === false){
        res.status(403).send();
        return 0;
    }
    let user = await UzytkownikController.get_uzytkownik(cookies["id"]);
    res.send({uzytkownik: user});
})

router.patch("/uzytkownik", async (req ,res) => {
    let cookies = req.signedCookies;
    if (cookies["id"] === undefined || cookies["id"] === false){
        res.status(403).send();
        return 0;
    }
    let user = await uzytkownik_controller.get_uzytkownik(cookies["id"]);
    user.imie = req.body.imie;
    user.nazwisko = req.body.nazwisko;
    user.email = req.body.email;
    user.login = req.body.login;
    let x = await uzytkownik_controller.update_uzytkownik(user);
    if (x === "ok") {
        let user = await uzytkownik_controller.get_uzytkownik_by_login(req.body.login);
        res.cookie("stan_konta", user.stan_konta, {signed: true})
        res.cookie("id", user.id, {signed: true});
    }
    res.send({status: x})
})

module.exports = router;