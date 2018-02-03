const express = require('express');
const router = express.Router();
const config = require('../config/database');
const KlijentDodatnaUsluga = require('../models/klijentdodatnausluga');

// Vraćanje dodatnih usluga klijenta
router.post('/vratiusluge', (req, res, next) => {
    const id = req.body.klijent_id;

    // Vrati sve dodatne usluge klijenta
    KlijentDodatnaUsluga.vratiDodatneUslugeKlijenta(id, (err, data) => {
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

// Vraćanje svih zapisa
router.get('/vratisvezapise', (req, res, next) => {
    KlijentDodatnaUsluga.vratiSveZapise((err, data) => {
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

module.exports = router;