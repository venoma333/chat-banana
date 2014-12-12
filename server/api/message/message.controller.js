'use strict';

var _ = require('lodash');
var Message = require('./message.model');
var User = require('../user/user.model');

// Get list of messages
exports.index = function(req, res) {
    Message.find(function (err, messages) {
        if(err) { return handleError(res, err); }
        return res.json(200, messages);
    });
};

// Get a single message
exports.show = function(req, res) {
    Message.findById(req.params.id, function (err, message) {
        if(err) { return handleError(res, err); }
        if(!message) { return res.send(404); }
        return res.json(message);
    });
};

// Creates a new message in the DB.
exports.create = function(req, res, next) {
    var newMessage = new Message();
    User.findById(req.body.uid, function(err, user) {
        if(err) return next(err);
        if(!user) return res.send(401);
        newMessage.name = user.profile.name;
        newMessage.sent = Date.now();
        newMessage.postMessage(newMessage);
        newMessage.save(function(err, message) {
            if(err) { return handleError(res, err); }
            return res.json(201, message);
        });
    });
};

// Updates an existing message in the DB.
exports.update = function(req, res) {
    if(req.body._id) { delete req.body._id; }
    Message.findById(req.params.id, function (err, message) {
        if (err) { return handleError(res, err); }
        if(!message) { return res.send(404); }
        var updated = _.merge(message, req.body);
        updated.edited = true;
        updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.json(200, message);
        });
    });
};

// Deletes a message from the DB.
exports.destroy = function(req, res) {
    Message.findById(req.params.id, function (err, message) {
        if(err) { return handleError(res, err); }
        if(!message) { return res.send(404); }
        message.remove(function(err) {
            if(err) { return handleError(res, err); }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}