const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Pretraga = require('../models/pretraga');

// Registracija korisnik
router.post('/unosPretrage', (req, res, next) => {
    let log = new Pretraga({
        id_korisnika: req.body.id_prijavljenog_korisnika,
        korisnicko_ime: req.body.korisnicko_ime,
        trazeni_maticni_broj: req.body.maticni_broj,
        datum_pretrage: Date.now()
    });

    Pretraga.addLog(log, (err, user) => {
        if(err) {
            res.json({
                success: false,
                msg: 'Greška!'
            });
        } else {
            res.json({
                success: true,
                msg: 'Log unešen!'
            });
        }
    });
});

module.exports = router;