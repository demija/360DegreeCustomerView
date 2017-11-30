const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Depozit = require('../models/depozit');

// Vraćanje podataka racun
router.post('/vratipodatke', (req, res, next) => {
    const id = req.body.klijent_id;

    Depozit.getDataById(id, (err, data) => {
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
                    msg: 'Ne postoji depozit',
                    data: null
                });
            }
        }
    });
});

module.exports = router;