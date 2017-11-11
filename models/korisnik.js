const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User schema
const userSchema = mongoose.Schema({
    name: {
        type: String
    },

    email: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

userSchema.set('collection', 'korisnici');

const Korisnik = module.exports = mongoose.model('Korisnik', userSchema);

module.exports.getUserById = function(id, callback) {
    Korisnik.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username}
    
    Korisnik.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            //if(err) throw err;
            //newUser.password = hash;
            //newUser.save(callback);

            if(err) {
                throw err;
            } else {
                newUser.password = hash;
                newUser.save(callback);
            }
        });
    });
}