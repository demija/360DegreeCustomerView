const mongoose = require('mongoose');
const config = require('../config/database');

// Arhiva - šema
const archiveSchema = mongoose.Schema({
    id_korisnika: {
        type: String
    },

    ime: {
        type: String
    },

    prezime: {
        type: String
    },

    email: {
        type: String
    },

    korisnicko_ime: {
        type: String
    },

    odjel: {
        type: Object
    },

    uspjesan_login: {
        type: String
    },

    poruka: {
        type: String
    },

    hostname: {
        type: String
    },

    type: {
        type: String
    },

    ip_address: {
        type: String
    },

    datum_prijave: {
        type: Date
    }
});

archiveSchema.set('collection', 'arhiva_prijava');

const Arhiva = module.exports = mongoose.model('Arhiva', archiveSchema);

module.exports.addLog = function(log, callback) {
    log.save(callback);
}