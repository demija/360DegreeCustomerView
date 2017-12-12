const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Klijent = require('../models/klijent');

// Vraćanje podataka klijent
router.post('/vratipodatke', (req, res, next) => {
    const maticni_broj = req.body.maticni_broj;

    Klijent.getDataByMaticniBroj(maticni_broj, (err, client) => {
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

// Update klijenta
router.post('/izmjenapodataka', (req, res, next) => {
    let klijent = req.body;
    klijent.datum_izmjene = Date.now(),
    
    Klijent.updateKlijenta(klijent, (err, user) => {
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

module.exports = router;