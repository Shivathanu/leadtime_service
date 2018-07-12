var express = require('express');
var router = express.Router();
var userController = require('./UserController');
var bomDetailController = require('./BomDetailController');

router.use('/user', userController);

router.use('/bom-detail', bomDetailController);

module.exports = router;
