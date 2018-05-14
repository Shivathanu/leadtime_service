var express = require('express');
var router = express.Router();
var userController = require('./UserController');
var bomDetailController = require('./BomDetailController');
var itemDetailController = require('./ItemDetailController');

router.use('/user', userController);

router.use('/bom-detail', bomDetailController);

router.use('/item-detail', itemDetailController);

module.exports = router;
