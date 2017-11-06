/*
REF: SSD4 Web App Dev course material lab 2 + 3
https://ddrohan.github.io/wit-wad/topic02-node/book-b-lab02/index.html#/06
REF: http://mongoosejs.com/docs/queries.html
REF: https://stackoverflow.com/questions/42541791/how-do-i-perform-a-find-query-in-mongoose
REF: https://docs.mongodb.com/v3.2/reference/method/db.collection.findOneAndUpdate/
REF: http://snipref.com/uncategorized/mongoose-js-find-with-regex/
REF: https://stackoverflow.com/questions/45736636/mongoose-remove-a-entire-object-from-a-nested-array
REF: https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
REF: https://alexanderzeitler.com/articles/mongoose-referencing-schema-in-properties-and-arrays/
REF: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
*/

var vouchers = require('../models/vouchers');
var express = require('express');
var router = express.Router();
var Voucher = require('../models/vouchers');
var db = require('../dbconnection');

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