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

router.findByID = function(req, res) {

    Voucher.findById({"_id" : req.params.id}, function(err, voucher){

        if(err || !voucher)
            res.json({message: 'Voucher NOT Found!'});
        else
            res.json(voucher);
    });

}

router.addVoucher = function(req, res) {

    // Check if voucher already exists
    Voucher.findById({"_id": req.body.id}, function(err, voucher) {

        if (err || !voucher) {

            //Add a NEW voucher
            var newVoucher = new Voucher();

            newVoucher.active = req.body.active;
            newVoucher.description = req.body.description;
            newVoucher.value = req.body.value;
            newVoucher.type = req.body.type;

            // Save the voucher and check for errors
            newVoucher.save(function (err) {
                if (err)
                    res.send(err);

                res.json({message: 'Voucher Added!'});
            });
        } else
            res.json({message: 'Voucher already exists'});

    });
}

router.deleteVoucher = function(req, res) {

    //Delete voucher based on ID
    Voucher.findOneAndRemove({"_id":req.params.id}, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Voucher Deleted!'});
    });
}

router.updateValue = function(req, res) {

    //check input not null or empty
    if(req.body.value === null || req.body.value === "")
        res.json({ message: 'Invalid Input!'});

    else {
        //Find voucher value by ID and update
        Voucher.findOneAndUpdate({"_id": req.params.id}, {$set: {value: req.body.value}}, function (err, voucher) {
            if (err)
                res.send(err);

            res.json({message: 'Voucher Value Updated!'});
        });
    }
}


module.exports = router;