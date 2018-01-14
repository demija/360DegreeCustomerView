const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Klijent = require('../models/klijent');

// Vraćanje podataka klijenta
router.post('/vratipodatke', (req, res, next) => {
    const maticni_broj = req.body.maticni_broj;

    Klijent.vratiPoMaticnombroju(maticni_broj, (err, client) => {
        if(err) {
            throw err;
        } else {
            if(client) {
                res.json({
                    success: true,
                    msg: 'ok',
                    client: client
                });
            } else {
                res.json({
                    success: false,
                    msg: 'Ne postoji klijent sa traženim matičnim brojem',
                    client: null
                });
            }
        }
    });
});

// Vraćanje svih klijenata
router.get('/vratisvezapise', (req, res, next) => {
    Klijent.vratiSveZapise((err, data) => {
        if(err) {
            throw err;
        } else {
            if(data) {
                res.json({
                    success: true,
                    msg: 'ok',
                    data: data
                });
            } else {
                res.json({
                    success: false,
                    msg: 'Ne postoje podaci',
                    data: null
                });
            }
        }
    });
});

// Update klijenta
router.post('/izmjena', (req, res, next) => {
    let klijent = req.body;
    klijent.datum_izmjene = Date.now(),
    
    Klijent.izmjena(klijent, (err, user) => {
        if(err) {
            res.json({
                success: false,
                msg: 'Greška, izmjene nisu sačuvane!'
            });
        } else {
            res.json({
                success: true,
                msg: 'Izmjene sačuvane!'
            });
        }
    });
});

// Dodavanje klijenta
router.post('/dodaj', (req, res, next) => {
    let noviKlijent = new Klijent(req.body);
    noviKlijent.datum_evidentiranja = Date.now();

    console.log(noviKlijent);
    
    Klijent.dodaj(noviKlijent, (err, user) => {
        if(err) {
            res.json({
                success: false,
                msg: 'Greška!'
            });
        } else {
            res.json({
                success: true,
                msg: 'Klijent uspješno dodan!'
            });
        }
    });
});

module.exports = router;