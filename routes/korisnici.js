const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Korisnik = require('../models/korisnik');

// Register
router.post('/registracija', (req, res, next) => {
    let newUser = new Korisnik({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    Korisnik.addUser(newUser, (err, user) => {
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

// Authentications
router.post('/authenticate', (req, res, next) => {
    res.send('AUTHENTICATE');
});

// Profile
router.get('/profil', (req, res, next) => {
    res.send('PROFIL KORISNIKA');
});

module.exports = router;