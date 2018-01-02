const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Račun - šema
const userSchema = mongoose.Schema({
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

    datum_otvaranja: {
        type: String
    },

    kraj_vazenja: {
        type: String
    },

    stopa: {
        type: Number
    },

    stanje_racuna: {
        type: String
    }
});

userSchema.set('collection', 'depoziti');

const Depozit = module.exports = mongoose.model('Depozit', userSchema);

module.exports.getDataById = function(id, callback) {
    const ObjectId = require('mongoose').Types.ObjectId; 
    const query = {
        klijent: new ObjectId(id)
    };
    
    Depozit.find(query, callback);
}

module.exports.getAllTypes = function(callback) {
    Depozit.aggregate(
        { $group: { _id: { tip_ugovora: "$tip_ugovora", opis_tipa_ugovora: "$opis_tipa_ugovora" }}},
        callback
    );
}

module.exports.getDepozitReport = function(pretraga, callback) {
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
    
    Depozit.find(query, callback).sort('datum_ugovora');
}