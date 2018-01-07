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
        type: String,
        required: true
    },

    datum_izdavanja_lk: {
        type: Date,
        required: true
    },

    datum_vazenja_lk: {
        type: Date,
        required: true
    },

    mail_adresa: {
        type: String
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

    bracno_stanje: {
        type: String
    },

    radni_status: {
        type: String
    },

    firma_zaposlenja: {
        type: Object
    },

    primanja_zadnji_mjesec: {
        type: String
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

    segment_klijenta: {
        type: String
    },

    cb_klasifikacija: {
        type: String
    },

    datum_izmjene: {
        type: Date
    },

    datum_evidentiranja: {
        type: Date
    }
});

klijentSchema.set('collection', 'klijenti');

const Klijent = module.exports = mongoose.model('Klijent', klijentSchema);

module.exports.vratiPoMaticnombroju = function(maticni_broj, callback) {
    const query = {
        maticni_broj: maticni_broj
    }
    
    Klijent.findOne(query, callback);
}

module.exports.izmjena = function(klijent, callback) {
    const ObjectId = require('mongoose').Types.ObjectId; 
    const query = {
        _id: new ObjectId(klijent._id)
    };

    Klijent.updateOne(query, klijent, callback);
}

module.exports.dodaj = function(noviKlijent, callback) {
    noviKlijent.save(callback);
}