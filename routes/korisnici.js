const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Korisnik = require('../models/korisnik');

//
let ldap = require('ldapjs');

let token = null;
//

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

    if(req.body.poslovnica) {
        noviKorisnik['poslovnica'] = req.body.poslovnica;
    }

    Korisnik.vratiKorisnickoIme(noviKorisnik.korisnicko_ime, (err, user) => {
        if(err) {
            throw err;
        } else {
            if(!user) {
                Korisnik.dodaj(noviKorisnik, (err, user) => {
                    if(err) {
                        res.json({
                            success: false,
                            msg: 'Greška prilikom registracije.'
                        });
                    } else {
                        res.json({
                            success: true,
                            msg: 'Korisnik uspješno registrovan.'
                        });
                    }
                });
            } else {
                res.json({
                    success: false,
                    msg: 'Korisničko ime već postoji.'
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
        odjel: req.body.odjel,
        poslovnica: req.body.poslovnica,
        datum_zadnje_izmjene: Date.now()
    });

    if(req.body.poslovnica) {
        korisnik['poslovnica'] = req.body.poslovnica;
    }

    Korisnik.izmjena(korisnik, (err, user) => {
        if(err) {
            res.json({
                success: false,
                msg: 'Greška, izmjene nisu sačuvane.'
            });
        } else {
            res.json({
                success: true,
                msg: 'Izmjene sačuvane.'
            });
        }
    });
});

// Update lozinke korisnika
router.post('/izmjenalozinke', (req, res, next) => {
    let korisnik = new Korisnik({
        _id: req.body._id,
        lozinka: req.body.novaLozinka,
        datum_zadnje_izmjene: Date.now()
    });

    Korisnik.izmjenaLozinke(korisnik, (err, user) => {
        if(err) {
            res.json({
                success: false,
                msg: 'Greška, izmjene nisu sačuvane.'
            });
        } else {
            res.json({
                success: true,
                msg: 'Nova lozinka sačuvana.'
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
                // Active directory autentifikacija
                let url = "ldap://ldap.example.com/dc=example,dc=com";
                let userPrincipalName = req.body.korisnicko_ime + "@" + req.body.domain;
                let passwd = req.body.lozinka;
                let suffix = "dc=" + req.body.domain.replace(/\./g, ",dc=");
            
                if(passwd === '') {
                    return;
                }
            
                // Bind korisnika
                let adClient = ldap.createClient({ url: url });
                adClient.bind(userPrincipalName, passwd, function(err) {
                    if(err) {
                        if(err.name === 'InvalidCredentialsError') {
                            return res.json({
                                success: false,
                                msg: 'Pogrešni podaci.'
                            });
                        } else {
                            return res.json({
                                success: false,
                                msg: JSON.stringify(err)
                            });
                        }
                    } else {
                        adClient.search(suffix, 
                            {
                                scope: "sub",
                                filter: "(userPrincipalName=" + userPrincipalName + ")"
                            }, 
                            function(err, ldapResult) {
                                if(err) {
                                    return res.json({
                                        success: false,
                                        msg: 'Graška: ' + err
                                    });
                                }
                        
                                ldapResult.on('searchEntry', function(entry) {
                                    let groups = entry.object.memberOf;
                                    let member = false;
                                    
                                    if (typeof groups === "string") {
                                        groups = [groups];
                                    }

                                    if(groups) {
                                        groups.forEach(element => {
                                            if(element == 'korisnik360') {
                                                member = true;
                                            }
                                        });
                                    }
                                    
                                    if(member) {
                                        token = jwt.sign({data: user}, config.secret, {
                                            expiresIn: 3600 // 1h
                                        });
                                        
                                        res.json({
                                            success: true,
                                            token: 'JWT ' + token,
                                            user: user
                                        });
                                    } else {
                                        return res.json({
                                            success: false,
                                            msg: 'Korisnik nema potrebne privilegije.'
                                        });
                                    }
                                });
                            }
                        );
                    }
                });

                return res.json({
                    success: false,
                    msg: 'Korisnik ne postoji.'
                });
            }

            Korisnik.uporediLozinke(lozinka, user.lozinka, (err, isMatch) => {
                if(err) {
                    throw err;
                } else {
                    if(isMatch) {
                        token = jwt.sign({data: user}, config.secret, {
                            expiresIn: 3600 // 1h
                        });

                        res.json({
                            success: true,
                            token: 'JWT ' + token,
                            user: user
                        });
                    } else {
                        return res.json({
                            success: false,
                            msg: 'Pogrešna lozinka.'
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
                    msg: 'Ne postoje podaci.',
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
                msg: 'Greška, izmjene nisu sačuvane.'
            });
        } else {
            res.json({
                success: true,
                msg: 'Izmjene sačuvane.'
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
                msg: 'Greška, izmjene nisu sačuvane.'
            });
        } else {
            res.json({
                success: true,
                msg: 'Izmjene sačuvane.'
            });
        }
    });
});

module.exports = router;