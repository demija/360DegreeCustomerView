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

    datum_otvaranja: {
        type: String
    },

    kraj_vazenja: {
        type: String
    },

    stopa: {
        type: Number
    },

    stanje_racuna: {
        type: String
    }
});

userSchema.set('collection', 'depoziti');

const Depozit = module.exports = mongoose.model('Depozit', userSchema);

module.exports.getDataById = function(id, callback) {
    const ObjectId = require('mongoose').Types.ObjectId; 
    const query = { klijent: new ObjectId(id) };
    
    Depozit.find(query, callback);
}