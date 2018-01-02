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
    },

    izmjenio: {
        type: Object
    },

    datum_izmjene: {
        type: Date
    }
});

ponudaSchema.set('collection', 'ponude');

const Ponuda = module.exports = mongoose.model('Ponuda', ponudaSchema);

//Dodavanje nove ponude
module.exports.dodaj = function(novaPonuda, callback) {
    novaPonuda.save(callback);
}

//Vrati sve ponude
module.exports.vratiSveZapise = function(callback) {
    const query = {
        obrisana: false
    };

    Ponuda.find(query, callback);
}

//Vrati aktivne ponude
module.exports.vratiAktivnePonude = function(callback) {
    const query = {
        obrisana: false,
        aktivna: true
    };

    Ponuda.find(query, callback);
}

//Obriši ponudu
module.exports.obrisi = function(ponuda, callback) {
    const ObjectId = require('mongoose').Types.ObjectId; 
    const query = {
        _id: new ObjectId(ponuda._id)
    };

    Ponuda.updateOne(query, {$set: {obrisana: true}}, callback);
}

//Izmjeni ponudu
module.exports.izmjeni = function(ponuda, callback) {
    const ObjectId = require('mongoose').Types.ObjectId; 
    const query = {
        _id: new ObjectId(ponuda._id)
    };

    Ponuda.updateOne(query, {$set: { naziv_ponude: ponuda.naziv_ponude, sifra_ponude: ponuda.sifra_ponude, klasa_ponude: ponuda.klasa_ponude,
        datum_od: ponuda.datum_od, datum_do: ponuda.datum_do, izmjenio: ponuda.izmjenio, datum_izmjene: ponuda.datum_izmjene }}, callback);
}

//Aktivna ponuda
module.exports.aktivnaPonuda = function(ponuda, callback) {
    const ObjectId = require('mongoose').Types.ObjectId; 
    const query = {
        _id: new ObjectId(ponuda._id)
    };

    Ponuda.updateOne(query, {$set: { aktivna: ponuda.aktivna, izmjenio: ponuda.izmjenio, datum_izmjene: ponuda.datum_izmjene }}, callback);
}