const mongoose = require('mongoose');
const config = require('../config/database');

// Klijent - šema
const klijentSchema = mongoose.Schema({
    ime: {
        type: String,
        required: true
    },

    prezime: {
        type: String,
        required: true
    },

    maticni_broj: {
        type: String,
        required: true
    },

    broj_lk: {
        type: String
    },

    datum_izdavanja_lk: {
        type: Date
    },

    datum_vazenja_lk: {
        type: Date
    },

    kucni_telefon: {
        type: String
    },

    mobilni_telefon: {
        type: String
    },

    adresa: {
        type: Object
    },

    radni_status: {
        type: Boolean
    },

    firma_zaposlenja: {
        type: Object
    },

    saglasnost_za_crk: {
        type: String
    },

    rejting_klijenta: {
        type: String
    },

    datum_rejtinga: {
        type: Date
    },

    mail_adresa: {
        type: String
    },

    datum_izmjene: {
        type: Date
    },

    datum_evidentiranja: {
        type: Date
    },

    kreirao: {
        type: Object
    },

    izmjenio: {
        type: Object
    }
});

klijentSchema.set('collection', 'klijenti');

const Klijent = module.exports = mongoose.model('Klijent', klijentSchema);

module.exports.dodaj = function(noviKlijent, callback) {
    noviKlijent.kreirao._id = mongoose.Types.ObjectId(noviKlijent.kreirao._id);
    noviKlijent.save(callback);
}

module.exports.izmjena = function(klijent, callback) {
    klijent.kreirao._id = mongoose.Types.ObjectId(klijent.kreirao._id);
    klijent.izmjenio._id = mongoose.Types.ObjectId(klijent.izmjenio._id);

    if(klijent.firma_zaposlenja._id) {
        klijent.firma_zaposlenja._id = mongoose.Types.ObjectId(klijent.firma_zaposlenja._id);
    }
    
    const ObjectId = require('mongoose').Types.ObjectId; 
    const query = {
        _id: new ObjectId(klijent._id)
    };

    Klijent.updateOne(query, klijent, callback);
}

module.exports.vratiSveZapise = function(callback) {    
    Klijent.find(callback);
}

module.exports.vratiPoMaticnombroju = function(maticni_broj, callback) {
    const query = {
        maticni_broj: maticni_broj
    }
    
    Klijent.findOne(query, callback);
}