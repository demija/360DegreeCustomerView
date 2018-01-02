const mongoose = require('mongoose');
const config = require('../config/database');

// Odjel - šema
const odjelSchema = mongoose.Schema({
    organizaciona_jedinica: {
        type: String
    }
});

odjelSchema.set('collection', 'odjeli');

const Odjel = module.exports = mongoose.model('Odjel', odjelSchema);

module.exports.vratiSveZapise = function(callback) {    
    Odjel.find(callback);
}