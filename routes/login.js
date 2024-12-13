const express = require('express');
const router = express.Router();
const uzytkownikController = require("../controllers/UzytkownikController").prototype;
const sessions = {};

router.get('/', (req, res) => {
    res.send({status: "ready"});
});

router.post('/', async (req, res) => {
    const {login, haslo} = req.body;
    const user = await uzytkownikController.authenticate(login, haslo);

    if(user) {
        res.cookie("stan_konta", user.stan_konta, {signed: true})
        res.cookie("id", user.id, {signed: true});
        res.send({status: "ok"});
    }
    else {
        res.send({status: "failure"});
    }
});

router.post("/wyloguj", (req, res) => {
    res.clearCookie("stan_konta");
    res.clearCookie("id");
    res.send("ok");
})

router.post("/autoryzuj", (req, res) => {
    let cookies = req.signedCookies;
    if (cookies["stan_konta"] === undefined || cookies["stan_konta"] === false || cookies["stan_konta"] !== "administrator"){
        res.status(403).send();
        return 0;
    }
    res.send("ok");
})

module.exports = router;