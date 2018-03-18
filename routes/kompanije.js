const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Kompanija = require('../models/kompanija');

// Vraćanje svih kompanija
router.get('/vratisvezapise', (req, res, next) => {
    Kompanija.vratiSveZapise((err, data) => {
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
                    msg: 'Ne postoje podaci.',
                    data: null
                });
            }
        }
    });
});

// Dodavanje kompanije
router.post('/dodaj', (req, res, next) => {
    let novaKompanija = new Kompanija(req.body);
    novaKompanija.datum_kreiranja = Date.now();
    
    Kompanija.dodaj(novaKompanija, (err, user) => {
        if(err) {
            res.json({
                success: false,
                msg: 'Greška.'
            });
        } else {
            res.json({
                success: true,
                msg: 'Kompanija uspješno dodana.'
            });
        }
    });
});

module.exports = router;