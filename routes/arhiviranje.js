const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Arhiva = require('../models/arhiva');
const os = require('os');

// Unos loga prijave
router.post('/unosloga', (req, res, next) => {
    var interfaces = os.networkInterfaces();
    var addresses = [];
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }

    let log = new Arhiva({
        id_korisnika: req.body.id_korisnika,
        ime: req.body.ime,
        prezime: req.body.prezime,
        email: req.body.email,
        korisnicko_ime: req.body.korisnicko_ime,
        odjel: req.body.odjel,
        uspjesan_login: req.body.success,
        poruka: req.body.msg,
        hostname: os.hostname(),
        type: os.type(),
        ip_address: addresses,
        datum_prijave: Date.now()
    });

    Arhiva.upisLoga(log, (err, user) => {
        if(err) {
            res.json({
                success: false,
                msg: 'Greška!'
            });
        } else {
            res.json({
                success: true,
                msg: 'Log unešen.'
            });
        }
    });
});

module.exports = router;