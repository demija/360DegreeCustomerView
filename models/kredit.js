const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Kredit - šema
const kreditSchema = mongoose.Schema({
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

    datum_ugovora: {
        type: String
    },

    datum_kraja_vazenja_ugovora: {
        type: String
    },

    odobreni_iznos: {
        type: String
    },

    stopa: {
        type: String
    },

    iznos_anuitet: {
        type: String
    },

    dospjela_glavnica: {
        type: String
    },

    nedospjela_glavnica: {
        type: String
    },

    glavnica_ostatak: {
        type: String
    }
});

kreditSchema.set('collection', 'krediti');

const Kredit = module.exports = mongoose.model('Kredit', kreditSchema);

module.exports.vratiKrediteKlijenta = function(klijent_id, callback) {
    const ObjectId = require('mongoose').Types.ObjectId; 
    const query = {
        klijent: new ObjectId(klijent_id)
    };
    
    Kredit.find(query, callback);
}