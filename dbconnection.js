var mongoose = require('mongoose');

var mLab = 'mongodb://<dbuser>:<dbpassword>@ds135876.mlab.com:35876/heroku_c1s4z34k';

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