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
    log.korisnik._id = mongoose.Types.ObjectId(log.korisnik._id);
    log.save(callback);
}

module.exports.brojPretraga = function(korisnik_id, callback) {
    const ObjectId = require('mongoose').Types.ObjectId; 
    const query = {
        'korisnik._id': new ObjectId(korisnik_id)
    };
    
    Pretraga.count(query, callback);
}