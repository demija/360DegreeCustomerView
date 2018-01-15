const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Korisnik - šema
const userSchema = mongoose.Schema({
    id_uposlenika: {
        type: String,
        required: true
    },

    ime: {
        type: String,
        required: true
    },

    prezime: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    korisnicko_ime: {
        type: String,
        required: true
    },

    lozinka: {
        type: String,
        required: true
    },

    odjel: {
        type: Object,
        required: true
    },

    datum_registracije: {
        type: Date
    },

    datum_zadnje_izmjene: {
        type: Date
    },

    aktivan: {
        type: Boolean,
        required: true
    },

    administrator: {
        type: Boolean,
        required: true
    }
});

userSchema.set('collection', 'korisnici');

const Korisnik = module.exports = mongoose.model('Korisnik', userSchema);

module.exports.vratiPoId = function(id, callback) {
    Korisnik.findById(id, callback);
}

module.exports.vratiKorisnickoIme = function(korisnicko_ime, callback) {
    const query = {
        korisnicko_ime: korisnicko_ime
    }
    
    Korisnik.findOne(query, callback);
}

module.exports.dodaj = function(noviKorisnik, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(noviKorisnik.lozinka, salt, (err, hash) => {
            if(err) {
                throw err;
            } else {
                noviKorisnik.lozinka = hash;
                noviKorisnik.save(callback);
            }
        });
    });
}

module.exports.izmjena = function(korisnik, callback) {
    korisnik.odjel._id = mongoose.Types.ObjectId(korisnik.odjel._id);
    const ObjectId = require('mongoose').Types.ObjectId;
    const query = {
        _id: new ObjectId(korisnik._id)
    };

    Korisnik.updateOne(query, korisnik, callback);
}

module.exports.izmjenaLozinke = function(korisnik, callback) {
    const ObjectId = require('mongoose').Types.ObjectId;
    const query = {
        _id: new ObjectId(korisnik._id)
    };

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(korisnik.lozinka, salt, (err, hash) => {
            if(err) {
                throw err;
            } else {
                korisnik.lozinka = hash;
                Korisnik.updateOne(query, korisnik, callback);
            }
        });
    });
}

module.exports.uporediLozinke = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) {
            throw err;
        } else {
            callback(null, isMatch);
        }
    });
}

module.exports.vratiSvePodatke = function(callback) {    
    Korisnik.find(callback);
}

module.exports.adminRola = function(korisnik, callback) {
    const ObjectId = require('mongoose').Types.ObjectId; 
    const query = {
        _id: new ObjectId(korisnik._id)
    };

    Korisnik.updateOne(query, {$set: {administrator:korisnik.administrator}}, callback);
}

module.exports.aktivanKorisnik = function(korisnik, callback) {
    const ObjectId = require('mongoose').Types.ObjectId; 
    const query = {
        _id: new ObjectId(korisnik._id)
    };

    Korisnik.updateOne(query, {$set: {aktivan:korisnik.aktivan}}, callback);
}