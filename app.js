const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const logger = require('morgan');
const cors = require("cors");
const db = require('./config/database');
const rejestracja = require("./routes/rejestracja");
const login = require("./routes/login");
const {log} = require("debug");

const app = express();


app.use(logger('dev'));
app.set('view engine', 'pug')
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use("/rejestracja", rejestracja);
app.use("/login", login);

app.get('/', (req, res) => {
  res.send('Aplikacja + baza danych');
});

app.get("/test", async (req, res) => {
});

app.get("/waluty", (req, res) => {
})



app.use((req, res, next) => {
  res.status(404).send('Nie znaleziono strony');
});


const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});

module.exports = app;