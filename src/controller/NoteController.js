var express = require('express');
var NoteController = express.Router();
var noteService = require('../service/NoteService');
var logger = require('../../config/log');

/**
 * Controller to match router "/api/note/create"
 * 
 * @param {Object} request
 * @param {Object} response
 */
NoteController.post('/create', function(request, response) {
    noteService.createNewNote(request.body, function(createError, note) {
        if (createError) {
            logger.error('Error while creating new note', {
                error: createError,
                params: request.body
            });
            response.status(500).send(createError);
        }
        response.send(note);
    });
});

/**
 * Controller to match router "/api/note/:bomId"
 * 
 * @param {Object} request
 * @param {Object} response
 */
NoteController.get('/:bomId', function(request, response) {
    noteService.getAllNotes(request.params, function(getError, notes) {
        if (getError) {
            logger.error('Error while getting notes by bomid', {
                error: getError,
                params: request.params
            });
            response.status(500).send(getError);
        }
        response.send(notes);
    });
});

module.exports = NoteController;
