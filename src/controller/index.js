var express = require('express');
var router = express.Router();
var userController = require('./UserController');
var bomDetailController = require('./BomDetailController');
var itemDetailController = require('./ItemDetailController');
var endUserController = require('./EndUserController');

router.use('/user', userController);

router.use('/bom-detail', bomDetailController);

router.use('/item-detail', itemDetailController);

router.use('/end-user', endUserController);

module.exports = router;
