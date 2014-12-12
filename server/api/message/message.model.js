'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
    name: String,
    message: String,
    sent: Date
});

module.exports = mongoose.model('Message', MessageSchema);