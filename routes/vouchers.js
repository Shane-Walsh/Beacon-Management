var vouchers = require('../models/vouchers');
var express = require('express');
var router = express.Router();
var Voucher = require('../models/vouchers');

router.listAll = function(req, res) {

    // find all vouchers
    Voucher.find(function(err, vouchers) {
        if (err || !vouchers)
            res.send(err);

        res.json(vouchers);
    });
}




module.exports = router;