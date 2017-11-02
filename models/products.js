var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    brand: { type: String, required: true},
    type: { type: String, required: true},
    description: { type: String, required: true},
    price: { type: Number, required: true},
    designation: { type: String, required: true, lowercase: true},
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
