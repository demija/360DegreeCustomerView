const express = require('express');
const router = express.Router();

// Register
router.get('/register', (req, res, next) => {
    res.send('REGISTAR');
});

// Authentications
router.post('/authenticate', (req, res, next) => {
    res.send('AUTHENTICATE');
});

// Profile
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});

// Profile
router.get('/validate', (req, res, next) => {
    res.send('VALIDATE');
});


module.exports = router;