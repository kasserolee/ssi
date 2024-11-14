const express = require('express');
const router = express.Router();
const uzytkownikController = require("../controllers/UzytkownikController").prototype;
const sessions = {};


function generateUniqueSessionId(){
    return Math.random().toString(36).substr(2, 9) + Date.now();
}


router.get('/', (req, res) => {
    res.send({status: "ready"});
});

router.post('/', async (req, res) => {
    const {login, haslo} = req.body;
    const user = await uzytkownikController.authenticate(login, haslo);

    if(user) {
        const sessionId = generateUniqueSessionId();
        const sessionData = {
            userId: user.id,
            role: user.stan_konta
        };

        sessions[sessionId] = sessionData;

        res.cookie('session_token', sessionId, {httpOnly: true});

        res.send({status: "success"});

        console.log(sessions);
    }
    else {
        res.send({status: "failure"});
    }
});

module.exports = router;