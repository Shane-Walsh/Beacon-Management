/*
REF: SSD4 Web App Dev course material lab 2 + 3
https://ddrohan.github.io/wit-wad/topic02-node/book-b-lab02/index.html#/06
*/
var mongoose = require('mongoose');

var VoucherSchema = new mongoose.Schema({

    type: { type: String, required: true, lowercase: true},
    value: { type: Number, required: true},
    description: { type: String, required: true},
    active: { type: Boolean, required: true},
    date: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Voucher', VoucherSchema);