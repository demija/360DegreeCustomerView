const express = require('express');
const router = express.Router();
const config = require('../config/database');
const KlijentPonuda = require('../models/klijentponuda');

// Dodavanje ponude klijenta
router.post('/dodaj', (req, res, next) => {
    let novaKlijentPonuda = new KlijentPonuda(req.body);
    novaKlijentPonuda.datum_evidentiranja = Date.now();
    
    KlijentPonuda.dodaj(novaKlijentPonuda, (err, user) => {
        if(err) {
            res.json({
                success: false,
                msg: 'Greška!'
            });
        } else {
            res.json({
                success: true,
                msg: 'Ponuda uspješno dodana!'
            });
        }
    });
});

module.exports = router;