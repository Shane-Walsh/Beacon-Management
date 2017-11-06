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

var beacons = require('../models/beacons');
var express = require('express');
var router = express.Router();
var Beacon = require('../models/beacons');
var db = require('../dbconnection');


router.listAll = function(req, res) {

    // find all beacons
    Beacon.find(function(err, beacons) {
        if (err || !beacons)
            res.send(err);

        res.json(beacons);
    });
}

router.findByName = function(req, res) {

    // Find a single beacon by name
    Beacon.findOne({ "name" : req.params.name },function(err, beacon) {

        if (err || !beacon)
            res.json({ message: 'Beacon NOT Found!' } );
        else
            res.json(beacon);
    });
}

router.addBeacon = function(req, res) {

    // Check if Beacon already exists
    Beacon.findOne({"name": req.body.name}, function(err, beacon) {

        if (err || !beacon) {

            //Add a NEW beacon
            var newBeacon = new Beacon();

            newBeacon.active = req.body.active;
            newBeacon.platform = req.body.platform;
            newBeacon.venue = req.body.venue;
            newBeacon.name = req.body.name;

            // Save the beacon and check for errors
            newBeacon.save(function (err) {
            if (err)
                res.send(err);

            res.json({message: 'Beacon Added!'});
        });
    } else
            res.json({message: 'Beacon Name already exists'});

    });
}

router.updateVenue = function(req, res) {

    if(req.body.venue === null || req.body.venue === "")
        res.json({ message: 'Invalid Input!'});

    else {
        //Find beacon by name and then Update venue
        Beacon.findOneAndUpdate({"name": req.params.name}, {$set: {venue: req.body.venue}}, function (err, beacon) {
            if (err)
                res.send(err);

            res.json({message: 'Venue Updated!'});
        });
    }
}

router.updatePlatform = function(req, res) {

    if(req.body.platform === null || req.body.platform === "")
        res.json({ message: 'Invalid Input!'});

    else {
        //Find beacon by name and then Update platform
        Beacon.findOneAndUpdate({"name": req.params.name}, {$set: {platform: req.body.platform}}, function (err, beacon) {
            if (err)
                res.send(err);

            res.json({message: 'Platform Updated!'});
        });
    }
}

router.deleteBeacon = function(req, res) {

    //Delete the selected beacon based on its name
    Beacon.findOneAndRemove({"name":req.params.name}, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Beacon Deleted!'});
    });
}

router.setStatus = function(req, res) {

    // Set beacon active true||false
    Beacon.findOneAndUpdate({"name":req.params.name}, {$set: { active:req.body.active}}, function(err, beacon){
        if(err)
            res.send(err);
        else if (req.body.active === true)
            res.json({ message: 'Beacon Activated!'});
        else
            res.json({ message: 'Beacon now Dormant'});
    });
}

router.listActive = function(req, res) {

        // List all active beacons
        Beacon.find({"active": true}, function (err, beacons) {

            if (err || !beacons)
                res.send(err);

            res.json(beacons);
        });
}

router.listInActive = function(req, res) {

    // List all active beacons
    Beacon.find({"active": false}, function (err, beacons) {

        if (err || !beacons)
            res.send(err);

        res.json(beacons);
    });
}

router.fuzzySearch = function (req, res) {

    // Partial search for Venues
    Beacon.find({"venue": {"$regex": req.query.venue, "$options": "i"}}, function(err, beacon) {

        if(err || !beacon)
            res.json({ message: 'Query NOT Found!' });
        else
            res.json(beacon);
    });
}


module.exports = router;