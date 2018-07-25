var express = require('express');
var router = express.Router();
var userController = require('./UserController');
var bomDetailController = require('./BomDetailController');
var noteController = require('./NoteController');

router.use('/user', userController);

router.use('/bom-detail', bomDetailController);

router.use('/note', noteController);

module.exports = router;
