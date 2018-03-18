const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Racun = require('../models/racun');

// Vraćanje podataka racun
router.post('/vratipodatke', (req, res, next) => {
    const klijent_id = req.body.klijent_id;

    Racun.vratiRacuneKlijenta(klijent_id, (err, data) => {
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
                    msg: 'Ne postoji račun.',
                    data: null
                });
            }
        }
    });
});

// Vraćanje svih tipova ugovora računa
router.get('/tipoviugovoraracuna', (req, res, next) => {
    Racun.tipoviUgovoraRacuna((err, data) => {
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

// Vraćanje kredita (pretraga)
router.post('/pretragaracunareport', (req, res, next) => {
    let pretraga = {
        tip_ugovora: req.body.tip_ugovora,
        datum_od: req.body.datum_od,
        datum_do: req.body.datum_do
    };

    Racun.pretragaRacunaReport(pretraga, (err, data) => {
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

// Vraćanje kartica računa
router.post('/vratikartice', (req, res, next) => {
    const klijent_id = req.body.klijent_id;

    Racun.vratiKarticeKlijenta(klijent_id, (err, data) => {
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
                    msg: 'Ne postoji račun.',
                    data: null
                });
            }
        }
    });
});

// Vraćanje svih tipova kartica
router.get('/tipoviugovorakartica', (req, res, next) => {
    Racun.tipoviUgovoraKartica((err, data) => {
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

// Vraćanje svih tipova kartica
router.get('/tipovikartica', (req, res, next) => {
    Racun.tipoviKartica((err, data) => {
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

// Vraćanje svih vrsta kartica
router.get('/vrstekartica', (req, res, next) => {
    Racun.vrsteKartica((err, data) => {
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

// Vraćanje kartica (pretraga)
router.post('/pretragakarticareport', (req, res, next) => {
    let pretraga = {
        tip_ugovora: req.body.tip_ugovora,
        tip_kartice: req.body.tip_kartice,
        vrsta_kartice: req.body.vrsta_kartice
    };

    Racun.pretragaKarticaReport(pretraga, (err, data) => {
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