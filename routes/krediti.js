const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Kredit = require('../models/kredit');

// Vraćanje podataka racun
router.post('/vratipodatke', (req, res, next) => {
    const id = req.body.klijent_id;

    Kredit.getDataById(id, (err, data) => {
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
                    msg: 'Ne postoji kredit',
                    data: null
                });
            }
        }
    });
});

module.exports = router;