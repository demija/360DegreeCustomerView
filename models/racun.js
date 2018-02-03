const mongoose = require('mongoose');
const config = require('../config/database');

// Račun - šema
const racunSchema = mongoose.Schema({
    klijent: {
        type: Object,
        required: true
    },

    konto: {
        type: String
    },

    datum_ugovora: {
        type: Date
    },

    datum_vazenja: {
        type: Date
    },

    ugovor: {
        type: Object
    },

    stanje_racuna: {
        type: Number
    },

    kartica: {
        type: Array
    }
});

racunSchema.set('collection', 'racuni');

const Racun = module.exports = mongoose.model('Racun', racunSchema);

module.exports.vratiRacuneKlijenta = function(klijent_id, callback) {
    const ObjectId = require('mongoose').Types.ObjectId; 
    const query = {
        'klijent._id': new ObjectId(klijent_id)
    };
    
    Racun.find(query, callback);
}

module.exports.tipoviUgovoraRacuna = function(callback) {
    Racun.aggregate(
        { $group: { _id: { tip_ugovora: "$ugovor.tip_ugovora", opis_tipa_ugovora: "$ugovor.opis_tipa_ugovora" } } },
        callback
    );
}

module.exports.pretragaRacunaReport = function(pretraga, callback) {
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
    
    Racun.find(query, callback).sort('datum_ugovora');
}

module.exports.vratiKarticeKlijenta = function(klijent_id, callback) {
    const ObjectId = require('mongoose').Types.ObjectId; 
    const query = {
        'klijent._id': new ObjectId(klijent_id)
    };
    
    Racun.find(query, callback).select({'kartica':1, 'ugovor':1});
}

module.exports.tipoviUgovoraKartica = function(callback) {
    Racun.aggregate(
        { $group: { _id: { kartica: "$kartica.ugovor" } } },
        callback
    );
}

module.exports.tipoviKartica = function(callback) {
    Racun.aggregate(
        { $group: { _id: { tip_kartice: "$kartica.tip_kartice" } } },
        callback
    );
}

module.exports.vrsteKartica = function(callback) {
    Racun.aggregate(
        { $group: { _id: { vrsta_kartice: "$kartica.vrsta_kartice" } } },
        callback
    );
}

module.exports.pretragaKarticaReport = function(pretraga, callback) {
    let datumi = {}

    const query = {
        'kartica.ugovor.tip_ugovora': { $in: pretraga.tip_ugovora }
    };

    if(pretraga.tip_kartice) {
        query['kartica.tip_kartice'] = { $eq: pretraga.tip_kartice };
    }

    if(pretraga.vrsta_kartice) {
        query['kartica.vrsta_kartice'] = { $eq: pretraga.vrsta_kartice };
    }
    
    Racun.find(query, callback).select({'kartica':1, 'klijent':1, 'ugovor':1});
}