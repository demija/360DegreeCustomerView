const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Biljeska = require('../models/biljeska');

// Vraćanje bilješki klijenta
router.post('/vratibiljeske', (req, res, next) => {
    const klijent_id = req.body.klijent_id;

    Biljeska.vratiBiljeske(klijent_id, (err, data) => {
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
                    msg: 'Ne postoje zapisi klijenta.',
                    data: null
                });
            }
        }
    });
});

// Vraćanje bilješki korisnika
router.post('/biljeskekorisnika', (req, res, next) => {
    const id = req.body._id;

    Biljeska.getDataForKorisnik(id, (err, data) => {
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
                    msg: 'Greška.',
                    data: null
                });
            }
        }
    });
});

// Vraćanje svih bilješki
router.post('/svebiljeske', (req, res, next) => {
    let pretraga = {
        datum_od: req.body.datum_od,
        datum_do: req.body.datum_do
    };

    Biljeska.getBiljeskeReport(pretraga, (err, data) => {
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
                    msg: 'Greška.',
                    data: null
                });
            }
        }
    });
});

// Dodavanje bilješke
router.post('/dodaj', (req, res, next) => {
    let novaBiljeska = new Biljeska(req.body);
    novaBiljeska.datum_kreiranja = Date.now();
    
    Biljeska.dodaj(novaBiljeska, (err, user) => {
        if(err) {
            res.json({
                success: false,
                msg: 'Greška.'
            });
        } else {
            res.json({
                success: true,
                msg: 'Bilješka uspješno dodana.'
            });
        }
    });
});

module.exports = router;