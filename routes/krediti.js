const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Kredit = require('../models/kredit');

// Vraćanje podataka krediti
router.post('/vratipodatke', (req, res, next) => {
    const klijent_id = req.body.klijent_id;

    Kredit.vratiKrediteKlijenta(klijent_id, (err, data) => {
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
                    msg: 'Ne postoji kredit',
                    data: null
                });
            }
        }
    });
});

// Vraćanje svih tipova ugovora
router.get('/tipoviugovora', (req, res, next) => {
    Kredit.tipoviUgovora((err, data) => {
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

// Vraćanje kredita (pretraga)
router.post('/pretragareport', (req, res, next) => {
    let pretraga = {
        tip_ugovora: req.body.tip_ugovora,
        datum_od: req.body.datum_od,
        datum_do: req.body.datum_do
    };

    Kredit.pretragaReport(pretraga, (err, data) => {
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