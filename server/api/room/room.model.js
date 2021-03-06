'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RoomSchema = new Schema({
    name: String,
    info: String,
    messages: [{
        name: String,
        uid: Schema.Types.ObjectId,
        message: String,
        sent: Date
    }],
    active: Boolean
});

module.exports = mongoose.model('Room', RoomSchema);
