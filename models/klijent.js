const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Klijent - šema
const userSchema = mongoose.Schema({
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
        type: String,
        required: true
    },

    datum_vazenja_lk: {
        type: String,
        required: true
    },

    email: {
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
        type: String
    },

    segment_klijenta: {
        type: String
    },

    cb_klasifikacija: {
        type: String
    }
});

userSchema.set('collection', 'klijenti');

const Klijent = module.exports = mongoose.model('Klijent', userSchema);

module.exports.getDataByMaticniBroj = function(maticni_broj, callback) {
    const query = { maticni_broj: maticni_broj }
    
    Klijent.findOne(query, callback);
}