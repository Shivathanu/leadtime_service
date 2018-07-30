var express = require('express');
var router = express.Router();
var bomDetailController = require('./BomDetailController');
var itemDetailController = require('./ItemDetailController');
var mailController = require('./MailController');
var noteController = require('./NoteController');

router.use('/bom-detail', bomDetailController);

router.use('/item-detail', itemDetailController);

router.use('/mail', mailController);

router.use('/note', noteController);

module.exports = router;
