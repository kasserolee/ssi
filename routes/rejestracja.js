const express = require('express');
const router = express.Router();
const uzytkownik_controller = require("../controllers/UzytkownikController").prototype
const uzytkownik_dto = require("../dto/UzytkownikDto")

router.get('/', (req, res) => {
    res.send({status: "ready"});
});

router.post('/', (req, res) => {
    console.log(req.body.uzytkownik)
    uzytkownik_controller.save_uzytkownik(req.body.uzytkownik).then(status => res.send({status: status}))
})

////uzytkownik_controller.save_uzytkownik(uzytkownik).then(out => res.send(out));

module.exports = router;