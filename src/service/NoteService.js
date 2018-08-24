var async = require('async');
var noteDao = require('../dao/NoteDao');
var userService = require('../service/UserService');
var NoteService = {};

/**
 * Method to get user name for notes
 * 
 * @param {Array} notes 
 * @param {Function} getNameCB 
 */
var getUserNameforNotes = function(notes, getNameCB) {
    async.map(notes, function(note, asyncCB) {
        userService.getUserName(note.dataValues.userId, function(userErr, user) {
            if (userErr) {
                return asyncCB(userErr);
            }
            note.dataValues.userName = user.dataValues.firstName + '.' +
                user.dataValues.lastName;
            return asyncCB(null, note);
        });
    }, function(mapErr, result) {
        /* istanbul ignore if */
        if (mapErr) {
            return getNameCB(mapErr);
        }
        return getNameCB(null, result);
    });
};

/**
 * Service to get all notes by bomid
 * 
 * @param {Object} reqParams
 * @param {Function} getNotesCB
 */
NoteService.getAllNotes = function(reqParams, getNotesCB) {
    async.waterfall([
        async.apply(noteDao.getNotesByBomId, reqParams.bomId),
        getUserNameforNotes
    ], function(waterfallErr, result) {
        /* istanbul ignore if */
        if (waterfallErr) {
            return getNotesCB(waterfallErr);
        }
        return getNotesCB(null, result);
    });
};

/**
 * Service to create a new note for a bomid
 * 
 * @param {Object} reqParams
 * @param {Function} createCB
 */
NoteService.createNewNote = function(reqParams, createCB) {
    async.parallel({
        note: noteDao.createNoteForBom.bind(null, reqParams),
        user: userService.getUserName.bind(null, reqParams.userId)
    }, function(parallelErr, result) {
        if (parallelErr) {
            return createCB(parallelErr);
        }
        result.note.dataValues.userName = result.user.dataValues.userName;
        return createCB(null, result.note);
    });
};

/**
 * Service to get recently created note
 * 
 * @param {String} bomId
 * @param {Function} getNoteCB
 */
NoteService.getLatestNote = function(bomId, getNoteCB) {
    noteDao.getRecentNote(bomId, function(getErr, note) {
        /* istanbul ignore if */
        if (getErr) {
            return getNoteCB(getErr);
        }
        return getNoteCB(null, note);
    });
};

module.exports = NoteService;