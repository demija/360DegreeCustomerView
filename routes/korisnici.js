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

    Korisnik.getUserByUsername(noviKorisnik.korisnicko_ime, (err, user) => {
        if(err) {
            throw err;
        } else {
            if(!user) {
                Korisnik.addUser(noviKorisnik, (err, user) => {
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

// Autentifikacija korisnika
router.post('/autentifikacija', (req, res, next) => {
    const username = req.body.korisnicko_ime;
    const password = req.body.lozinka;

    Korisnik.getUserByUsername(username, (err, user) => {
        if(err) {
            throw err;
        } else {
            if(!user || !user.aktivan) {
                return res.json({
                    success: false,
                    msg: 'Korisnik ne postoji ili nije aktivan'
                });
            }

            Korisnik.comparePassword(password, user.lozinka, (err, isMatch) => {
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
                            user: {
                                id: user._id,
                                ime: user.ime,
                                prezime: user.prezime,
                                korisnicko_ime: user.korisnicko_ime,
                                email: user.email
                            }
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

module.exports = router;