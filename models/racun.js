const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Račun - šema
const userSchema = mongoose.Schema({
    klijent: {
        type: Object
    },

    opis_tipa_ugovora: {
        type: String
    },

    tip_ugovora: {
        type: String
    },

    partija: {
        type: String
    },

    konto: {
        type: String
    },

    datum_otvaranja: {
        type: String
    },

    sifra_valute: {
        type: String
    },

    stanje_racuna_val: {
        type: String
    },

    stanje_racuna_ekv: {
        type: String
    }
});

userSchema.set('collection', 'racuni');

const Racun = module.exports = mongoose.model('Racun', userSchema);

module.exports.getDataById = function(id, callback) {
    const ObjectId = require('mongoose').Types.ObjectId; 
    const query = { klijent: new ObjectId(id) };
    
    Racun.find(query, callback);
}