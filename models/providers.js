var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = require('./user');

var providerSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    mobile: { type: Number },
    address: { type: String },
    city: { type: String },
    zipcode: { type: Number },
    state: { type: String },
    country: String,
    user_id: { type: ObjectId, ref: 'User' }
});


module.exports = mongoose.model('Provider', providerSchema);