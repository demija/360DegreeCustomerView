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

module.exports = router;