const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Konekcija na bazu
mongoose.connect(config.database);

// Konektovano
mongoose.connection.on('connected', () => {
    console.log('Connected to database: ' + config.database);
})

const app = express();

const korisnici = require('./routes/korisnici');

// port
const port = 3000;

// CORS middleware
app.use(cors());

// Postavljanje static foldera
app.use(express.static(path.join(__dirname, 'public')));

// Body parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/korisnici', korisnici);

// Index ruta
app.get('/', (req, res) => {
    res.send('Invalid endpoint');
})

/*app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})*/

// Start servera
app.listen(port, () => {
    console.log('Server started on port: ' + port);
});