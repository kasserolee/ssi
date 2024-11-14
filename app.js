const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require("cors");
const db = require('./config/database');
const uzytkownik_controller = require('./controllers/UzytkownikController').prototype
const waluta_controller = require('./controllers/WalutaController').prototype

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Aplikacja + baza danych');
});

app.get("/test", (req, res) => {
    waluta_controller.save_waluta({symbol_unicode: "123", nazwa: "abc", kraj: "aaa"}).then((value) => {
        res.send(value)
    })
})

app.get("/waluty", (req, res) => {
    waluta_controller.all().then((value) => {
        res.send(value)
    })
})


app.use((req, res, next) => {
  res.status(404).send('Nie znaleziono strony');
});


const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});

module.exports = app;