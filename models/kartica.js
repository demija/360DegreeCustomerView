const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Kartica - šema
const karticaSchema = mongoose.Schema({
    klijent: {
        type: Object
    },

    tip_ugovora: {
        type: String
    },

    opis_tipa_ugovora: {
        type: String
    },

    opis: {
        type: String
    },

    vrsta_kartice: {
        type: String
    },

    tip_kartice: {
        type: String
    },

    datum_vazenja: {
        type: String
    },

    stanje: {
        type: String
    }
});

karticaSchema.set('collection', 'kartice');

const Kartica = module.exports = mongoose.model('Kartica', karticaSchema);

module.exports.vratiKarticeKlijenta = function(klijent_id, callback) {
    const ObjectId = require('mongoose').Types.ObjectId; 
    const query = {
        klijent: new ObjectId(klijent_id)
    };
    
    Kartica.find(query, callback);
}