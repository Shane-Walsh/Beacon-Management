var mongoose = require('mongoose');

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/beaconsdb',{
    useMongoClient: true });

var db = mongoose.connection;
mongoose.Promise = require('bluebird'); // Deprecation warning

db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected to database');
});

module.exports = db;