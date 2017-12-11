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

module.exports = router;