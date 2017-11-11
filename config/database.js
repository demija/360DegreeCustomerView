const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    database: 'mongodb://localhost:27017/360dcv',
    secret: crypto
}