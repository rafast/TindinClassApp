const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const passport = require('passport');

router.post('/users/create', userController.register);
router.post('/users', passport.authenticate('local'), userController.login);

module.exports = router;