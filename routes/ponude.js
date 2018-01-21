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
        aktivna: req.body.aktivna,
        kreirao: {
            _id: req.body.kreirao._id,
            korisnicko_ime: req.body.kreirao.korisnicko_ime
        },
        datum_kreiranja: Date.now(),
        obrisana: false
    });

    Ponuda.dodaj(novaPonuda, (err, user) => {
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
    Ponuda.vratiSveZapise((err, data) => {
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

// Vrati aktivne ponude
router.get('/vratiaktivneponude', (req, res, next) => {
    Ponuda.vratiAktivnePonude((err, data) => {
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

    Ponuda.obrisi(ponuda, (err, user) => {
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

// Izmjeni ponudu
router.post('/izmjeniponudu', (req, res, next) => {
    let ponuda = new Ponuda({
        _id: req.body._id,
        naziv_ponude: req.body.naziv_ponude,
        sifra_ponude: req.body.sifra_ponude,
        klasa_ponude: req.body.klasa_ponude,
        izmjenio: req.body.izmjenio,
        datum_izmjene: Date.now()
    });

    Ponuda.izmjeni(ponuda, (err, user) => {
        if(err) {
            res.json({
                success: false,
                msg: 'Greška prilikom izmjene!'
            });
        } else {
            res.json({
                success: true,
                msg: 'Izmjene sačuvane!'
            });
        }
    });
});

// Update aktivnost ponude
router.post('/aktivnaponuda', (req, res, next) => {
    let ponuda = {
        _id: req.body._id,
        aktivna: req.body.aktivna,
        izmjenio: req.body.izmjenio,
        datum_izmjene: Date.now()
    };

    Ponuda.aktivnaPonuda(ponuda, (err, user) => {
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