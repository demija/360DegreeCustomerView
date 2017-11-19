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
        type: String,
        required: true
    },

    datum_registracije: {
        type: Date
    },

    broj_telefona: {
        type: String
    }
});

userSchema.set('collection', 'korisnici');

const Korisnik = module.exports = mongoose.model('Korisnik', userSchema);

module.exports.getUserById = function(id, callback) {
    Korisnik.findById(id, callback);
}

module.exports.getUserByUsername = function(korisnicko_ime, callback) {
    const query = {korisnicko_ime: korisnicko_ime}
    
    Korisnik.findOne(query, callback);
}

module.exports.addUser = function(noviKorisnik, callback) {
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

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) {
            throw err;
        } else {
            callback(null, isMatch);
        }
    });
}