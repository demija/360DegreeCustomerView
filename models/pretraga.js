const mongoose = require('mongoose');
const config = require('../config/database');

// Arhiva - šema
const searchSchema = mongoose.Schema({
    id_korisnika: {
        type: String
    },

    korisnicko_ime: {
        type: String
    },

    trazeni_maticni_broj: {
        type: String
    },

    datum_pretrage: {
        type: Date
    }
});

searchSchema.set('collection', 'pretrage_korisnika');

const Pretraga = module.exports = mongoose.model('Pretraga', searchSchema);

module.exports.addLog = function(log, callback) {
    log.save(callback);
}