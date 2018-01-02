const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Racun = require('../models/racun');

// Vraćanje podataka racun
router.post('/vratipodatke', (req, res, next) => {
    const klijent_id = req.body.klijent_id;

    Racun.vratiRacuneKlijenta(klijent_id, (err, data) => {
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
                    msg: 'Ne postoji račun',
                    data: null
                });
            }
        }
    });
});

module.exports = router;