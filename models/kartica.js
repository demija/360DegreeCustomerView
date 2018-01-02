const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Kartica - šema
const karticaSchema = mongoose.Schema({
    klijent: {
        type: Object
    },

    tip_ugovora: {
        type: String
    },

    opis_tipa_ugovora: {
        type: String
    },

    opis: {
        type: String
    },

    vrsta_kartice: {
        type: String
    },

    tip_kartice: {
        type: String
    },

    datum_vazenja: {
        type: String
    },

    stanje: {
        type: String
    }
});

karticaSchema.set('collection', 'kartice');

const Kartica = module.exports = mongoose.model('Kartica', karticaSchema);

module.exports.vratiKarticeKlijenta = function(klijent_id, callback) {
    const ObjectId = require('mongoose').Types.ObjectId; 
    const query = {
        klijent: new ObjectId(klijent_id)
    };
    
    Kartica.find(query, callback);
}

module.exports.vratiSveTipove = function(callback) {
    Kartica.aggregate(
        { $group: { _id: { tip_ugovora: "$tip_ugovora", opis_tipa_ugovora: "$opis_tipa_ugovora", opis: "$opis" }}},
        callback
    );
}

module.exports.vratiKarticeReport = function(pretraga, callback) {
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
    
    Kartica.find(query, callback).sort('datum_ugovora');
}