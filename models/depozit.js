const mongoose = require('mongoose');
const config = require('../config/database');

// Račun - šema
const userSchema = mongoose.Schema({
    klijent: {
        type: Object,
        required: true
    },

    ugovor: {
        type: Object
    },

    stopa: {
        type: Number
    },

    stanje_racuna: {
        type: Number
    },

    datum_ugovora: {
        type: Date
    },

    datum_vazenja: {
        type: Date
    },

    aktivan_racun: {
        type: Boolean
    }
});

userSchema.set('collection', 'depoziti');

const Depozit = module.exports = mongoose.model('Depozit', userSchema);

module.exports.getDataById = function(id, callback) {
    const ObjectId = require('mongoose').Types.ObjectId; 
    const query = {
        'klijent._id': new ObjectId(id)
    };
    
    Depozit.find(query, callback);
}

module.exports.getAllTypes = function(callback) {
    Depozit.aggregate(
        { $group: { _id: { tip_ugovora: "$ugovor.tip_ugovora", opis_tipa_ugovora: "$ugovor.opis_tipa_ugovora" }}},
        callback
    );
}

module.exports.getDepozitReport = function(pretraga, callback) {
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
    
    Depozit.find(query, callback).sort('datum_ugovora');
}