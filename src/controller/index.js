var express = require('express');
var router = express.Router();
var UserController = require('./UserController');

router.use('/user', UserController);

module.exports = router;
