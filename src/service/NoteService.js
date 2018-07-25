var noteDao = require('../dao/NoteDao');
var NoteService = {};

/**
 * Service to get all notes by bomid
 * 
 * @param {Object} reqParams
 * @param {Function} getNotesCB
 */
NoteService.getAllNotes = function(reqParams, getNotesCB) {
    noteDao.getNotesByBomId(reqParams.bomId, function(findError, notes) {
        if (findError) {
            return getNotesCB(findError);
        }
        return getNotesCB(null, notes);
    });
};

/**
 * Service to create a new note for a bomid
 * 
 * @param {Object} reqParams
 * @param {Function} createCB
 */
NoteService.createNewNote = function(reqParams, createCB) {
    noteDao.createNoteForBom(reqParams, function(createError, note) {
        if (createError) {
            return createCB(createError);
        }
        return createCB(null, note);
    });
};

module.exports = NoteService;