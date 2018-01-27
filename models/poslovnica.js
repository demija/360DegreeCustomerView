const mongoose = require('mongoose');
const config = require('../config/database');

// Poslovnica - šema
const poslovnicaSchema = mongoose.Schema({
    naziv: {
        type: String
    }
});

poslovnicaSchema.set('collection', 'poslovnice');

const Poslovnica = module.exports = mongoose.model('Poslovnica', poslovnicaSchema);

module.exports.vratiSveZapise = function(callback) {    
    Poslovnica.find(callback);
}