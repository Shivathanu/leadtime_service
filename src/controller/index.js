var express = require('express');
var router = express.Router();
var UserController = require('./UserController');
var BomDetailController = require('./BomDetailController');

router.use('/user', UserController);

router.use('/bom-detail', BomDetailController);

module.exports = router;
