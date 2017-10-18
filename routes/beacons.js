var beacons = require('../models/beacons');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Beacon = require('../models/beacons');

mongoose.connect('mongodb://localhost:27017/beaconsdb');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected to database');
});


router.listAll = function(req, res) {

    // Use the Beacons model to find all beacons
    Beacon.find(function(err, beacons) {
        if (err)
            res.send(err);

        res.json(beacons);
    });
}


router.findByName = function(req, res) {

    // Use the Beacon model to find a single beacon by name
    Beacon.find({ "name" : req.params.name },function(err, beacon) {
        if (err)
            res.json({ message: 'Beacon NOT Found!', errmsg : err } );
        else
            res.json(beacon);
    });
}
/*
router.fuzzySearch = function (req, res) {

    //Beacon name fuzzy search
    Beacon.find({name: {$regex: /^B/i, $options:'m'}}, function(err, beacon) {

        if(err)
            res.json({ message: 'NOT Found!', errmsg : err } );
        else
            res.json(beacon);
    });
}
*/
router.addBeacon = function(req, res) {

    //Add a NEW beacon
    var beacon = new Beacon();

    beacon.active = req.body.active;
    beacon.platform = req.body.platform;
    beacon.venue = req.body.venue;
    beacon.name = req.body.name;

    console.log('Adding Beacon: ' + JSON.stringify(beacon));

    // Save the beacon and check for errors
    beacon.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Beacon Added!'});
    });
}


router.updateVenue = function(req, res) {

    //Find beacon by name and then Update venue
    Beacon.findOneAndUpdate({"name":req.params.name}, {$set: { venue:req.body.venue}}, function(err, beacon){
        if(err)
            res.send(err);

        res.json({ message: 'Venue Updated!'});
    });
}

router.updatePlatform = function(req, res) {

    //Find beacon by name and then Update platform
    Beacon.findOneAndUpdate({"name":req.params.name}, {$set: { platform:req.body.platform}}, function(err, beacon){
        if(err)
            res.send(err);

        res.json({ message: 'Platform Updated!'});
    });
}

router.setActive = function(req, res) {

    //Set beacon active true||false
    Beacon.findOneAndUpdate({"name":req.params.name}, {$set: { active:req.body.active}}, function(err, beacon){
        if(err)
            res.send(err);
        else if (req.body.active === true)
            res.json({ message: 'Beacon Activated!'});
        else
            res.json({ message: 'Beacon NOT Active!'});
    });
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


module.exports = router;