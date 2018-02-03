const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Klijent dodatna usluga - šema
const klijentDodatnaUslugaSchema = mongoose.Schema({
    klijent: {
        type: Object
    },

    dodatne_usluge: {
        type: Array
    }
});

klijentDodatnaUslugaSchema.set('collection', 'klijenti_dodatne_usluge');

const KlijentDodatnaUsluga = module.exports = mongoose.model('KlijentDodatnaUsluga', klijentDodatnaUslugaSchema);

module.exports.vratiDodatneUslugeKlijenta = function(id, callback) {
    const ObjectId = require('mongoose').Types.ObjectId; 
    const query = {
        'klijent._id': new ObjectId(id)
    };
    
    KlijentDodatnaUsluga.find(query, callback);
}

module.exports.vratiSveZapise = function(callback) {    
    KlijentDodatnaUsluga.find(callback);
}