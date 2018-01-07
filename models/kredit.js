const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Kredit - šema
const kreditSchema = mongoose.Schema({
    klijent: {
        type: Object
    },

    datum_ugovora: {
        type: Date
    },

    odobreni_iznos: {
        type: Number
    },

    stopa: {
        type: Number
    },

    iznos_anuitet: {
        type: Number
    },

    dospjela_glavnica: {
        type: Number
    },

    nedospjela_glavnica: {
        type: Number
    },

    glavnica_ostatak: {
        type: Number
    },

    datum_vazenja: {
        type: Date
    },

    ugovor: {
        type: Object
    }    
});

kreditSchema.set('collection', 'krediti');

const Kredit = module.exports = mongoose.model('Kredit', kreditSchema);

module.exports.vratiKrediteKlijenta = function(klijent_id, callback) {
    const ObjectId = require('mongoose').Types.ObjectId; 
    const query = {
        'klijent._id': new ObjectId(klijent_id)
    };
    
    Kredit.find(query, callback);
}

module.exports.tipoviUgovora = function(callback) {
    Kredit.aggregate(
        { $group: { _id: { tip_ugovora: "$ugovor.tip_ugovora", opis_tipa_ugovora: "$ugovor.opis_tipa_ugovora" } } },
        callback
    );
}

module.exports.pretragaReport = function(pretraga, callback) {
    let datumi = {}

    const query = {
        'ugovor.tip_ugovora': { $in: pretraga.tip_ugovora }
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