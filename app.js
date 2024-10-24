const express = require('express');
const path = require('path');
const logger = require('morgan');
const db = require('./config/database');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Aplikacja + baza danych');
});


app.use((req, res, next) => {
  res.status(404).send('Nie znaleziono strony');
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});

module.exports = app;