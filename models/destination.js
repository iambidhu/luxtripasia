var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = require('./user');

var destinationSchema = new Schema({
    name: { type: String, require: true },
    user_id: { type: ObjectId, ref: 'User' }
});





module.exports = mongoose.model('Destination', destinationSchema);