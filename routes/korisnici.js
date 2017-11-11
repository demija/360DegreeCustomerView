const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Korisnik = require('../models/korisnik');

// Registracija korisnik
router.post('/registracija', (req, res, next) => {
    let noviKorisnik = new Korisnik({
        ime_prezime: req.body.ime_prezime,
        email: req.body.email,
        korisnicko_ime: req.body.korisnicko_ime,
        lozinka: req.body.lozinka
    });

    Korisnik.addUser(noviKorisnik, (err, user) => {
        if(err) {
            res.json({
                success: false,
                msg: 'Failed to register user'
            });
        } else {
            res.json({
                success: true,
                msg: 'User added'
            });
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
            if(!user) {
                return res.json({
                    success: false,
                    msg: 'User not found'
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
                                ime_prezime: user.ime_prezime,
                                korisnicko_ime: user.korisnicko_ime,
                                email: user.email
                            }
                        })
                    } else {
                        return res.json({
                            success: false,
                            msg: 'Wrong password'
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