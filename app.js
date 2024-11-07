const express = require('express');
const path = require('path');
const logger = require('morgan');
const db = require('./config/database');
const uzytkownik_controller_req = require('./controllers/uzytkownik_controller')

const app = express();
const uzytkownik_controller = uzytkownik_controller_req.prototype;


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Aplikacja + baza danych');
});

app.get("/test", async (req, res) => {
    let uzytkownik = {login: "abcde", haslo: "123", imie: "aaa", nazwisko: "bbb", email: "123@321.pl"}
    let ok = await uzytkownik_controller.save_uzytkownik(uzytkownik)
    res.send(ok)
})

app.get("/uzytkownicy", async (req, res) => {
    let a = await uzytkownik_controller.all()
    res.send(a)
})


app.use((req, res, next) => {
  res.status(404).send('Nie znaleziono strony');
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});

module.exports = app;