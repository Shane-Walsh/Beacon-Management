var mongoose = require('mongoose');

// connect to mLab Heroku or local
var MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/beaconsdb';

// connect to mongodb
mongoose.connect(MONGO_URI,{
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

