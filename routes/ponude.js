const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Recommender = require('likely');
const KlijentDodatnaUsluga = require('../models/klijentdodatnausluga');
const Ponuda = require('../models/ponuda');
const Klijent = require('../models/klijent');

// Dodavanje ponude
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
                msg: 'Greška.'
            });
        } else {
            res.json({
                success: true,
                msg: 'Ponuda uspješno dodana.'
            });
        }
    });
});

// Vrati sve zapise
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
                    msg: 'Ne postoje podaci.',
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
                    msg: 'Ne postoje podaci.',
                    data: null
                });
            }
        }
    });
});

// Vrati preporučene ponude
router.post('/vratipreporuceneponude', (req, res, next) => {
    const id = req.body.klijent_id;
    var aktivnePonude;
    var klijenti;
    var klijentiDodatneUsluge;

    // Vrati aktivne ponude
    Ponuda.vratiAktivnePonude((err, data) => {
        if(err) {
            throw err;
        } else {
            if(data) {
                this.aktivnePonude = data;
            } else {
                this.aktivnePonude = null;
            }
        }
    });
    
    // Vrati sve klijente
    Klijent.vratiSveZapise((err, data) => {
        if(err) {
            throw err;
        } else {
            if(data) {
                this.klijenti = data;
            } else {
                this.klijenti = null;
            }
        }
    });

    // Vrati dodatne usluge svih klijenata
    KlijentDodatnaUsluga.vratiSveZapise((err, data) => {
        if(err) {
            throw err;
        } else {
            if(data) {
                this.klijentiDodatneUsluge = data;
            } else {
                this.klijentiDodatneUsluge = null;
            }
        }
    });

    var inputMatrix = [];
    var ponudeArray;
    var rowLabels = [];
    var colLabels = [];

    if(this.klijenti && this.aktivnePonude) {
        this.klijenti.forEach(elementKlijenti => {
            ponudeArray = [];
            this.aktivnePonude.forEach(elementPonude => {
                let postoji = 0;
                
                this.klijentiDodatneUsluge.forEach(elementDodatneUsluge => {
                    if(elementKlijenti._id.toString() == elementDodatneUsluge.klijent._id.toString()) {
                        elementDodatneUsluge.dodatne_usluge.forEach(element => {
                            if(elementPonude._id.toString() == element._id.toString()) {
                                postoji = 5;
                            }
                        });
                    }
                });

                ponudeArray.push(postoji);
            });

            rowLabels.push(elementKlijenti._id);
            inputMatrix.push(ponudeArray);
        });
    }

    if(this.aktivnePonude) {
        this.aktivnePonude.forEach(element => {
            colLabels.push(element.naziv_ponude);        
        });
    }

    if(inputMatrix.length > 0) {
        var Model = Recommender.buildModel(inputMatrix, rowLabels, colLabels);
        var recommendations = Model.recommendations(id);

        function Comparator(a, b) {
            if (a[1] > b[1]) {
                return -1;
            }
            
            if (a[1] < b[1]) {
                return 1;
            }
            
            return 0;
        }

        recommendations = recommendations.sort(Comparator);

        res.json({
            success: true,
            msg: 'ok',
            data: recommendations
        });
    }
});

// Brisanje ponude
router.post('/obrisi', (req, res, next) => {
    let ponuda = new Ponuda({
        _id: req.body._id
    });

    Ponuda.obrisi(ponuda, (err, user) => {
        if(err) {
            res.json({
                success: false,
                msg: 'Greška.'
            });
        } else {
            res.json({
                success: true,
                msg: 'Ponuda uspješno obrisana.'
            });
        }
    });
});

// Izmjena ponude
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