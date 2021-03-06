const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Odjel = require('../models/odjel');

// Vraćanje podataka odjeli
router.get('/vratisvepodatke', (req, res, next) => {
    Odjel.vratiSveZapise((err, data) => {
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

module.exports = router;