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

// Vraćanje svih tipova depozita
router.get('/vratisvetipove', (req, res, next) => {
    Depozit.getAllTypes((err, data) => {
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

// Vraćanje depozite (pretraga)
router.post('/vratidepozite', (req, res, next) => {
    let pretraga = {
        tip_ugovora: req.body.tip_depozita,
        datum_od: req.body.datum_od,
        datum_do: req.body.datum_do
    };

    Depozit.getDepozitReport(pretraga, (err, data) => {
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