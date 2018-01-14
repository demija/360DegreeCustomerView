const mongoose = require('mongoose');
const config = require('../config/database');

// Kompanija - šema
const kompanijaSchema = mongoose.Schema({
    naziv: {
        type: String,
        required: true
    },

    sifra: {
        type: String
    },

    telefon: {
        type: String
    },

    datum_kreiranja: {
        type: Date
    },

    kreirao: {
        type: Object
    }
});

kompanijaSchema.set('collection', 'kompanije');

const Kompanija = module.exports = mongoose.model('Kompanija', kompanijaSchema);

module.exports.vratiSveZapise = function(callback) {    
    Kompanija.find(callback);
}

module.exports.dodaj = function(novaKompanija, callback) {
    novaKompanija.kreirao._id = mongoose.Types.ObjectId(novaKompanija.kreirao._id);
    novaKompanija.save(callback);
}