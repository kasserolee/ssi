const express = require('express');
const path = require('path');
const logger = require('morgan');
const db = require('./config/database');
const uzytkownik_controller = require('./controllers/uzytkownik_controller').prototype

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Aplikacja + baza danych');
});

app.get("/test", (req, res) => {
    let uzytkownik = {id: 3, login: "abcdef", haslo: "123", stan_konta: "użytkownik", imie: "abc", nazwisko: "c", email: "aabb.pl"}
    uzytkownik_controller.update_uzytkownik(uzytkownik).then((value) => {
        res.send(value)
    })
})

app.get("/uzytkownicy", (req, res) => {
    uzytkownik_controller.all().then((value) => {
        res.send(value)
    })
})


app.use((req, res, next) => {
  res.status(404).send('Nie znaleziono strony');
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});

module.exports = app;