const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Kartica = require('../models/kartica');

// Vraćanje podataka racun
router.post('/vratipodatke', (req, res, next) => {
    const klijent_id = req.body.klijent_id;

    Kartica.vratiKarticeKlijenta(klijent_id, (err, data) => {
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
                    msg: 'Ne postoji kartica',
                    data: null
                });
            }
        }
    });
});

// Vraćanje svih tipova kartica
router.get('/vratisvetipove', (req, res, next) => {
    Kartica.vratiSveTipove((err, data) => {
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

// Vraćanje kartica (pretraga)
router.post('/vratikartice', (req, res, next) => {
    let pretraga = {
        tip_ugovora: req.body.tip_kartice,
        datum_od: req.body.datum_od,
        datum_do: req.body.datum_do
    };

    Kartica.vratiKarticeReport(pretraga, (err, data) => {
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

module.exports = router;