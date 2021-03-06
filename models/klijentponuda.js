const mongoose = require('mongoose');
const config = require('../config/database');

// KlijentPonuda - šema
const klijentPonudaSchema = mongoose.Schema({
    klijent: {
        type: Object,
        required: true
    },

    evidentirao: {
        type: Object,
        required: true
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

module.exports.getDataById = function(id, callback) {
    const ObjectId = require('mongoose').Types.ObjectId; 
    const query = {
        'klijent._id': new ObjectId(id)
    };
    
    KlijentPonuda.find(query, callback).sort('-datum_evidentiranja');
}

module.exports.getDataForKorisnik = function(id, callback) {
    const ObjectId = require('mongoose').Types.ObjectId; 
    const query = {
        'evidentirao._id': new ObjectId(id)
    };
    
    KlijentPonuda.find(query, callback);
}

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

module.exports.getPonudeReport = function(pretraga, callback) {
    let datumi = {}

    const query = {
        
    };

    if(pretraga.datum_od != '' && pretraga.datum_od != undefined) {
        datumi.$gte = new Date(pretraga.datum_od);
    }

    if(pretraga.datum_do != '' && pretraga.datum_do != undefined) {
        datumi.$lt = new Date(pretraga.datum_do);
    }

    if(Object.keys(datumi).length !== 0) {
        query.datum_evidentiranja = datumi;
    }
    
    KlijentPonuda.find(query, callback);
}