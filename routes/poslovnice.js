const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Poslovnica = require('../models/poslovnica');

// Vraćanje podataka poslovnica
router.get('/vratisvepodatke', (req, res, next) => {
    Poslovnica.vratiSveZapise((err, data) => {
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