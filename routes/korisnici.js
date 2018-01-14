const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Korisnik = require('../models/korisnik');

// Registracija korisnik
router.post('/registracija', (req, res, next) => {
    let noviKorisnik = new Korisnik({
        id_uposlenika: req.body.id_uposlenika,
        ime: req.body.ime,
        prezime: req.body.prezime,
        email: req.body.email,
        korisnicko_ime: req.body.korisnicko_ime,
        lozinka: req.body.lozinka,
        odjel: req.body.odjel,
        datum_registracije: Date.now(),
        aktivan: true,
        administrator: false
    });

    Korisnik.vratiKorisnickoIme(noviKorisnik.korisnicko_ime, (err, user) => {
        if(err) {
            throw err;
        } else {
            if(!user) {
                Korisnik.dodaj(noviKorisnik, (err, user) => {
                    if(err) {
                        res.json({
                            success: false,
                            msg: 'Greška prilikom registracije!'
                        });
                    } else {
                        res.json({
                            success: true,
                            msg: 'Korisnik uspješno registrovan!'
                        });
                    }
                });
            } else {
                res.json({
                    success: false,
                    msg: 'Korisničko ime postoji!'
                });
            }
        }
    });
});

// Update korisnika
router.post('/izmjena', (req, res, next) => {
    let korisnik = new Korisnik({
        _id: req.body._id,
        ime: req.body.ime,
        prezime: req.body.prezime,
        email: req.body.email,
        //lozinka: req.body.lozinka,
        odjel: req.body.odjel,
        datum_zadnje_izmjene: Date.now()
    });

    Korisnik.izmjena(korisnik, (err, user) => {
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

// Autentifikacija korisnika
router.post('/autentifikacija', (req, res, next) => {
    const korisnicko_ime = req.body.korisnicko_ime;
    const lozinka = req.body.lozinka;

    Korisnik.vratiKorisnickoIme(korisnicko_ime, (err, user) => {
        if(err) {
            throw err;
        } else {
            if(!user || !user.aktivan) {
                return res.json({
                    success: false,
                    msg: 'Korisnik ne postoji ili nije aktivan'
                });
            }

            Korisnik.uporediLozinke(lozinka, user.lozinka, (err, isMatch) => {
                if(err) {
                    throw err;
                } else {
                    if(isMatch) {
                        const token = jwt.sign({data: user}, config.secret, {
                            expiresIn: 900 // 15 minuta
                        });

                        res.json({
                            success: true,
                            token: 'JWT ' + token,
                            user: user
                        })
                    } else {
                        return res.json({
                            success: false,
                            msg: 'Pogrešna lozinka'
                        });
                    }
                }
            });
        }
    });
});

// Profil korisnika
router.get('/profil', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({
        user: req.user
    });
});

// Vraćanje svih korisnika
router.get('/vratisvepodatke', (req, res, next) => {
    Korisnik.vratiSvePodatke((err, data) => {
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

// Update admin role korisnika
router.post('/adminrola', (req, res, next) => {
    let korisnik = {
        _id: req.body._id,
        administrator: req.body.administrator
    };

    Korisnik.adminRola(korisnik, (err, user) => {
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

// Update aktivnost korisnika
router.post('/aktivankorisnik', (req, res, next) => {
    let korisnik = {
        _id: req.body._id,
        aktivan: req.body.aktivan
    };

    Korisnik.aktivanKorisnik(korisnik, (err, user) => {
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