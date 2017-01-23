var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itinerarySchema = new Schema({
    daynumber: { type: int, required: true },
    title: { type: string, required: true },
    description: { type: string, required: true }
});