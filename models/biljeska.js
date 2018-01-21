const mongoose = require('mongoose');
const config = require('../config/database');

// Bilješka - šema
const biljeskaSchema = mongoose.Schema({
    klijent: {
        type: Object
    },

    kreirao: {
        type: Object
    },

    poruka: {
        type: String
    },

    datum_kreiranja: {
        type: Date
    }
});

biljeskaSchema.set('collection', 'biljeske');

const Biljeska = module.exports = mongoose.model('Biljeska', biljeskaSchema);

module.exports.vratiBiljeske = function(klijent_id, callback) {
    const ObjectId = require('mongoose').Types.ObjectId;
    const query = {
        'klijent._id': new ObjectId(klijent_id)
    };
    
    Biljeska.find(query, callback).sort('-datum_kreiranja');
}

module.exports.dodaj = function(novaBiljeska, callback) {
    novaBiljeska.klijent._id = mongoose.Types.ObjectId(novaBiljeska.klijent._id);
    novaBiljeska.kreirao._id = mongoose.Types.ObjectId(novaBiljeska.kreirao._id);
    novaBiljeska.save(callback);
}