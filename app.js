const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const logger = require('morgan');
const cors = require("cors");
const db = require('./config/database');
const rejestracja = require("./routes/rejestracja");
const login = require("./routes/login");
const {log} = require("debug");
const cookieParser = require("cookie-parser");

const app = express();

app.use(logger('dev'));
app.use(cookieParser());
app.set('view engine', 'pug')
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

const not_logged_in = ["/rejestracja", "/login"];
const logged_in = ["/a"];
const admin = ["/b"];

app.use((req, res, next) => {
  let cookie = req.cookies.uzytkownik;
  let role = "niezalogowany";
  if (cookie !== undefined) role = cookie.role;
  let clearance = 0;
  let sec = 2;
  if (not_logged_in.includes(req.path)) sec = 0;
  else if (logged_in.includes(req.path)) sec = 1;
  else if (admin.includes(req.path)) sec = 2;

  if (role === "użytkownik") clearance = 1;
  else if (role === "administrator") clearance = 2;

  if (clearance >= sec) next();
  else res.redirect("/403");
})

app.use("/rejestracja", rejestracja);
app.use("/login", login);

app.get('/', (req, res) => {
  res.send('Aplikacja + baza danych');
});

app.get("/test", async (req, res) => {
});

app.get("/waluty", (req, res) => {
})

app.get("/403", (req, res, next) => {
  res.send("403 Forbidden");
})

app.use((req, res, next) => {
  res.status(404).send('Nie znaleziono strony');
});


const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});

module.exports = app;