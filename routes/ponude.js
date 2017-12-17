const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Ponuda = require('../models/ponuda');

// Registracija korisnik
router.post('/dodaj', (req, res, next) => {
    let novaPonuda = new Ponuda({
        naziv_ponude: req.body.naziv_ponude,
        sifra_ponude: req.body.sifra_ponude,
        klasa_ponude: req.body.klasa_ponude,
        datum_od: req.body.datum_od,
        datum_do: req.body.datum_do,
        aktivna: req.body.aktivna,
        kreirao: {
            _id: req.body.kreirao._id,
            korisnicko_ime: req.body.kreirao.korisnicko_ime
        },
        datum_kreiranja: Date.now(),
        obrisana: false
    });

    Ponuda.addPonuda(novaPonuda, (err, user) => {
        if(err) {
            res.json({
                success: false,
                msg: 'Greška prilikom registracije!'
            });
        } else {
            res.json({
                success: true,
                msg: 'Ponuda uspješno dodata!'
            });
        }
    });
});

// Vrati sve ne obrisane ponude
router.get('/vratisvepodatke', (req, res, next) => {
    Ponuda.getAllData((err, data) => {
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

// Obirši ponudu
router.post('/obrisi', (req, res, next) => {
    let ponuda = new Ponuda({
        _id: req.body._id
    });

    Ponuda.deletePonuda(ponuda, (err, user) => {
        if(err) {
            res.json({
                success: false,
                msg: 'Greška prilikom registracije!'
            });
        } else {
            res.json({
                success: true,
                msg: 'Ponuda uspješno obrisana!'
            });
        }
    });
});

// Update aktivnost ponude
router.post('/aktivnaponuda', (req, res, next) => {
    let ponuda = {
        _id: req.body._id,
        aktivna: req.body.aktivna
    };

    Ponuda.activePonuda(ponuda, (err, user) => {
        if(err) {
            res.json({
                success: false,
                msg: 'Greška, izmjene nisu sačuvane!'
            });
        } else {
            res.json({
                success: true,
                msg: 'Izmjene sačuvane!'
            });
        }
    });
});

module.exports = router;