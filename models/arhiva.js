const mongoose = require('mongoose');
const config = require('../config/database');

// Arhiva - šema
const arhivSchema = mongoose.Schema({
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
        type: Boolean
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

arhivSchema.set('collection', 'arhiva_prijava');

const Arhiva = module.exports = mongoose.model('Arhiva', arhivSchema);

module.exports.upisLoga = function(log, callback) {
    log.odjel._id = mongoose.Types.ObjectId(log.odjel._id);
    log.save(callback);
}