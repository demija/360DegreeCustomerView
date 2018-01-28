const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Pretraga = require('../models/pretraga');

// Unos loga pretrage
router.post('/unosPretrage', (req, res, next) => {
    let log = new Pretraga({
        trazeni_maticni_broj: req.body.maticni_broj,
        korisnik: {
            _id: req.body.id_prijavljenog_korisnika,
            id_uposlenika: req.body.id_uposlenika,
            ime: req.body.ime,
            prezime: req.body.prezime,
            korisnicko_ime: req.body.korisnicko_ime,
            odjel: req.body.odjel,
            poslovnica: req.body.poslovnica
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
                msg: 'Log spašen!'
            });
        }
    });
});

// Broj pretraga korisnika
router.post('/brojpretragakorisnika', (req, res, next) => {
    let korisnik_id = req.body._id;

    Pretraga.brojPretragaKorisnika(korisnik_id, (err, data) => {
        if(err) {
            res.json({
                success: false,
                msg: 'Greška!',
                data: null
            });
        } else {
            res.json({
                success: true,
                msg: 'ok!',
                data: data
            });
        }
    });
});

// Vraćanje svih pretraga
router.post('/svepretrage', (req, res, next) => {
    let pretraga = {
        datum_od: req.body.datum_od,
        datum_do: req.body.datum_do
    };

    Pretraga.getPretrageReport(pretraga, (err, data) => {
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