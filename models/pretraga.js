const mongoose = require('mongoose');
const config = require('../config/database');

// Arhiva - šema
const pretragaSchema = mongoose.Schema({
    trazeni_maticni_broj: {
        type: String
    },

    korisnik: {
        type: Object
    },

    datum_pretrage: {
        type: Date
    }
});

pretragaSchema.set('collection', 'pretrage_korisnika');

const Pretraga = module.exports = mongoose.model('Pretraga', pretragaSchema);

module.exports.dodajLog = function(log, callback) {
    log.save(callback);
}