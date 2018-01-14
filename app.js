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
const klijenti = require('./routes/klijenti');
const racuni = require('./routes/racuni');
const depoziti = require('./routes/depoziti');
const kartice = require('./routes/kartice');
const krediti = require('./routes/krediti');
const odjeli = require('./routes/odjeli');
const arhive = require('./routes/arhiviranje');
const pretrage = require('./routes/pretrage');
const ponude = require('./routes/ponude');
const biljeske = require('./routes/biljeske');
const kompanije = require('./routes/kompanije');

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
app.use('/klijenti', klijenti);
app.use('/racuni', racuni);
app.use('/depoziti', depoziti);
app.use('/kartice', kartice);
app.use('/krediti', krediti);
app.use('/odjeli', odjeli);
app.use('/arhiviranje', arhive);
app.use('/pretrage', pretrage);
app.use('/ponude', ponude);
app.use('/biljeske', biljeske);
app.use('/kompanije', kompanije);

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