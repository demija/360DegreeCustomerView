const mongoose = require('mongoose');
const config = require('../config/database');

// KlijentPonuda - šema
const klijentPonudaSchema = mongoose.Schema({
    klijent: {
        type: Object
    },

    evidentirao: {
        type: Object
    },

    ponudjene_usluge: {
        type: Array
    },

    ugovorene_usluge: {
        type: Array
    },

    datum_evidentiranja: {
        type: Date
    }
});

klijentPonudaSchema.set('collection', 'klijenti_ponude');

const KlijentPonuda = module.exports = mongoose.model('KlijentPonuda', klijentPonudaSchema);

module.exports.dodaj = function(novaKlijentPonuda, callback) {
    novaKlijentPonuda.klijent._id = mongoose.Types.ObjectId(novaKlijentPonuda.klijent._id);
    novaKlijentPonuda.evidentirao._id = mongoose.Types.ObjectId(novaKlijentPonuda.evidentirao._id);

    novaKlijentPonuda.ponudjene_usluge.forEach(element => {
        element._id = mongoose.Types.ObjectId(element._id);
    });

    novaKlijentPonuda.ugovorene_usluge.forEach(element => {
        element._id = mongoose.Types.ObjectId(element._id);
    });

    novaKlijentPonuda.save(callback);
}