var Models = require('../models/index');
var NoteDao = {};

/**
 * Dao Method to find all notes by bomid
 * 
 * @param {String} bomId
 * @param {Function} findNotesCB
 */
NoteDao.getNotesByBomId = function(bomId, findNotesCB) {
    Models.Note.findAll({
        where: {
            bomId: bomId
        },
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(function(notes) {
        return findNotesCB(null, notes);
    }, function(findError) {
        return findNotesCB({
            error: findError.name,
            message: findError.parent.message
        });
    });
};

/**
 * Dao Method to create a new note for a bomid
 * 
 * @param {Object} reqParams
 * @param {Function} createNoteCB
 */
NoteDao.createNoteForBom = function(reqParams, createNoteCB) {
    Models.Note.create(reqParams).then(function(note) {
        return createNoteCB(null, note);
    }, function(createErr) {
        return createNoteCB(createErr);
    });
};

/**
 * Dao to get recent note by created date
 * 
 * @param {String} bomId
 * @param {Function} getNoteCB
 */
NoteDao.getRecentNote = function(bomId, getNoteCB) {
    Models.Note.find({
        where: {
            bomId: bomId
        },
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(function(note) {
        return getNoteCB(null, note);
    }, function(getError) {
        return getNoteCB({
            error: getError.name,
            message: getError.parent.message
        });
    });
};

module.exports = NoteDao;
