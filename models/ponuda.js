const mongoose = require('mongoose');
const config = require('../config/database');

// Korisnik - šema
const ponudaSchema = mongoose.Schema({
    naziv_ponude: {
        type: String
    },

    sifra_ponude: {
        type: String
    },

    klasa_ponude: {
        type: String
    },

    datum_od: {
        type: Date
    },

    datum_do: {
        type: Date
    },

    aktivna: {
        type: Boolean
    },

    kreirao: {
        type: Object
    },

    datum_kreiranja: {
        type: Date
    },

    obrisana: {
        type: Boolean
    }
});

ponudaSchema.set('collection', 'ponude');

const Ponuda = module.exports = mongoose.model('Ponuda', ponudaSchema);

//Dodavanje nove ponude
module.exports.addPonuda = function(novaPonuda, callback) {
    novaPonuda.save(callback);
}

//Vrati sve ponude
module.exports.getAllData = function(callback) {
    const query = {
        obrisana: false
    };

    Ponuda.find(query, callback);
}

//Vrati sve ponude
module.exports.deletePonuda = function(ponuda, callback) {
    const ObjectId = require('mongoose').Types.ObjectId; 
    const query = {
        _id: new ObjectId(ponuda._id)
    };

    Ponuda.updateOne(query, {$set: {obrisana: true}}, callback);
}

//Aktivna ponuda
module.exports.activePonuda = function(ponuda, callback) {
    const ObjectId = require('mongoose').Types.ObjectId; 
    const query = {
        _id: new ObjectId(ponuda._id)
    };

    Ponuda.updateOne(query, {$set: {aktivna:ponuda.aktivna}}, callback);
}