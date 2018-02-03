const mongoose = require('mongoose');
const config = require('../config/database');

// Arhiva - šema
const pretragaSchema = mongoose.Schema({
    trazeni_maticni_broj: {
        type: String,
        required: true
    },

    korisnik: {
        type: Object,
        required: true
    },

    datum_pretrage: {
        type: Date
    }
});

pretragaSchema.set('collection', 'pretrage_korisnika');

const Pretraga = module.exports = mongoose.model('Pretraga', pretragaSchema);

module.exports.dodajLog = function(log, callback) {
    log.korisnik.odjel._id = mongoose.Types.ObjectId(log.korisnik.odjel._id);
    log.korisnik._id = mongoose.Types.ObjectId(log.korisnik._id);

    if(log.korisnik.poslovnica) {
        log.korisnik.poslovnica._id = mongoose.Types.ObjectId(log.korisnik.poslovnica._id);
    }

    log.save(callback);
}

module.exports.brojPretragaKorisnika = function(korisnik_id, callback) {
    const ObjectId = require('mongoose').Types.ObjectId; 
    const query = {
        'korisnik._id': new ObjectId(korisnik_id)
    };
    
    Pretraga.count(query, callback);
}

module.exports.getPretrageReport = function(pretraga, callback) {
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
        query.datum_pretrage = datumi;
    }
    
    Pretraga.find(query, callback);
}