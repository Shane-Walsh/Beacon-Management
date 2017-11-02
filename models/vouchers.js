var mongoose = require('mongoose');

var VoucherSchema = new mongoose.Schema({

    type: { type: String, required: true, lowercase: true},
    value: { type: Number, required: true},
    description: { type: String, required: true},
    active: { type: Boolean, required: true},
    date: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Voucher', VoucherSchema);