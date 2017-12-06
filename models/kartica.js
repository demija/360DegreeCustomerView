const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Kartica - šema
const userSchema = mongoose.Schema({
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

userSchema.set('collection', 'kartice');

const Kartica = module.exports = mongoose.model('Kartica', userSchema);

module.exports.getDataById = function(id, callback) {
    const ObjectId = require('mongoose').Types.ObjectId; 
    const query = {
        klijent: new ObjectId(id)
    };
    
    Kartica.find(query, callback);
}