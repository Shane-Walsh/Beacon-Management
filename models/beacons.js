var mongoose = require('mongoose');

var BeaconSchema = new mongoose.Schema({
    name: String,
    venue: String,
    platform: String,
    active: Boolean
});

module.exports = mongoose.model('Beacon', BeaconSchema);
