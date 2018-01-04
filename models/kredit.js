const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Kredit - šema
const kreditSchema = mongoose.Schema({
    klijent: {
        type: Object
    },

    opis_tipa_ugovora: {
        type: String
    },

    tip_ugovora: {
        type: String
    },

    partija: {
        type: String
    },

    datum_ugovora: {
        type: Date
    },

    datum_kraja_vazenja_ugovora: {
        type: String
    },

    odobreni_iznos: {
        type: String
    },

    stopa: {
        type: String
    },

    iznos_anuitet: {
        type: String
    },

    dospjela_glavnica: {
        type: String
    },

    nedospjela_glavnica: {
        type: String
    },

    glavnica_ostatak: {
        type: String
    }
});

kreditSchema.set('collection', 'krediti');

const Kredit = module.exports = mongoose.model('Kredit', kreditSchema);

module.exports.vratiKrediteKlijenta = function(klijent_id, callback) {
    const ObjectId = require('mongoose').Types.ObjectId; 
    const query = {
        klijent: new ObjectId(klijent_id)
    };
    
    Kredit.find(query, callback);
}

module.exports.tipoviUgovora = function(callback) {
    Kredit.aggregate(
        { $group: { _id: { tip_ugovora: "$tip_ugovora", opis_tipa_ugovora: "$opis_tipa_ugovora" } } },
        callback
    );
}

module.exports.pretragaReport = function(pretraga, callback) {
    let datumi = {}

    const query = {
        tip_ugovora: pretraga.tip_ugovora
    };

    if(pretraga.datum_od != '' && pretraga.datum_od != undefined) {
        datumi.$gte = new Date(pretraga.datum_od);
    }

    if(pretraga.datum_do != '' && pretraga.datum_do != undefined) {
        datumi.$lt = new Date(pretraga.datum_do);
    }

    if(Object.keys(datumi).length !== 0) {
        query.datum_ugovora = datumi;
    }
    
    Kredit.find(query, callback).sort('datum_ugovora');
}