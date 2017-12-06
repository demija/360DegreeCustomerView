const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Odjel - šema
const userSchema = mongoose.Schema({
    organizaciona_jedinica: {
        type: String
    }
});

userSchema.set('collection', 'odjeli');

const Odjel = module.exports = mongoose.model('Odjel', userSchema);

module.exports.getAllData = function(callback) {    
    Odjel.find(callback);
}