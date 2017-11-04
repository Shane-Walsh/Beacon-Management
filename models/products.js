/*
REF: SSD4 Web App Dev course material lab 2 + 3
https://ddrohan.github.io/wit-wad/topic02-node/book-b-lab02/index.html#/06
*/
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
