const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require("cors");
const db = require('./config/database');
const rejestracja = require("./routes/rejestracja");

const app = express();


app.use(logger('dev'));
app.set('view engine', 'pug')
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Aplikacja + baza danych');
});

app.get("/test", (req, res) => {
})

app.get("/waluty", (req, res) => {
})

app.use("/rejestracja", rejestracja);


app.use((req, res, next) => {
  res.status(404).send('Nie znaleziono strony');
});


const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});

module.exports = app;