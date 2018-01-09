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
                    msg: 'Ne postoje zapisi za klijenta',
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
                msg: 'Greška!'
            });
        } else {
            res.json({
                success: true,
                msg: 'Bilješka uspješno dodana!'
            });
        }
    });
});

module.exports = router;