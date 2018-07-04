var express = require('express');
var router = express.Router();
var userController = require('./UserController');
var bomDetailController = require('./BomDetailController');
var itemDetailController = require('./ItemDetailController');
var contactUserController = require('./ContactUserController');

router.use('/user', userController);

router.use('/bom-detail', bomDetailController);

router.use('/item-detail', itemDetailController);

router.use('/contact-user', contactUserController);

module.exports = router;
