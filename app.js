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
const walutyRouter = require('./routes/waluty');
const ulubioneRouter = require("./routes/ulubione");
const uzytkownikRouter = require("./routes/uzytkownicy");
const historiaRouter = require("./routes/historia");

const app = express();

app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(logger('dev'));
app.use(cookieParser("SuperSecretParsing"));
app.set('view engine', 'pug')
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use("/rejestracja", rejestracja);
app.use("/login", login);
app.use("/api/waluty", walutyRouter);
app.use("/api/ulubione", ulubioneRouter);
app.use("/api/uzytkownicy", uzytkownikRouter);
app.use("/api/historia", historiaRouter);

app.use((req, res, next) => {
  res.status(404).send('Nie znaleziono strony');
});


const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});

module.exports = app;