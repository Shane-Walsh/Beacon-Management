var express = require('express');
var router = express.Router();
var db = require('../dbconnection');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Beacon Management Web App' });
});

module.exports = router;
