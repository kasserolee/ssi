const express = require('express');
const router = express.Router();
const historiaController = require("../controllers/HistoriaController").prototype;

router.use((req, res, next) => {
    let cookies = req.signedCookies;
    if (cookies["stan_konta"] === undefined || cookies["stan_konta"] === false || cookies["stan_konta"] !== "administrator"){
        res.status(403).send();
        return 0;
    }
    next();
})

router.post("/add", async (req, res) => {
    await historiaController.save_historia(req.body);
    res.send("ok");
})

module.exports = router;