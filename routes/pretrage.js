const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Pretraga = require('../models/pretraga');

// Registracija korisnik
router.post('/unosPretrage', (req, res, next) => {
    let log = new Pretraga({
        trazeni_maticni_broj: req.body.maticni_broj,
        korisnik: {
            id_korisnika: req.body.id_prijavljenog_korisnika,
            id_uposlenika: req.body.id_uposlenika,
            ime: req.body.ime,
            prezime: req.body.prezime,
            korisnicko_ime: req.body.korisnicko_ime,
        },
        datum_pretrage: Date.now()
    });

    Pretraga.dodajLog(log, (err, user) => {
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