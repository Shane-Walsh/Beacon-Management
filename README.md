# Assignment 1 - API testing and Source Control.

Name: Shane Walsh
ID: 20079607

Github Repo:
https://github.com/Shane-Walsh/Beacon-Management-Web-App

## Overview.

The objective of this Node.js web app is to manage a fleet of Bluetooth beacons,
along with associated products and vouchers.

Three resources were utilized in this app:

-Beacons
-Products
-Vouchers

Basic CRUD operations can be carried out on all resources along with extra functionality
- outlined in the endpoints list below:

## API endpoints.

//beacons endpoints

app.get('/beacons', beacons.listAll); - List all beacons
app.get('/beacons/:name', beacons.findByName); - Find one beacon by name
app.get('/beacons/:status/active', beacons.listActive); - List all active beacons
app.get('/beacons/:status/dormant', beacons.listInActive); - List all inactive/dormant beacons
app.get('/beacons/:venue/search', beacons.fuzzySearch); - Partial search of venues
app.post('/beacons', beacons.addBeacon); - Add a beacon
app.put('/beacons/:name/venue', beacons.updateVenue); - Update venue
app.put('/beacons/:name/platform', beacons.updatePlatform); - Update Platform 
app.put('/beacons/:name/status', beacons.setStatus); - Set beacon status active||inactive
app.delete('/beacons/:name', beacons.deleteBeacon); - Delete a beacon

//product endpoints

app.get('/products', products.findAll); - Find all products
app.get('/products/:designation', products.findOne); - Find one product
app.get('/products/:brand/search', products.partialSearch); - Partial Search product brand
app.post('/products', products.addProduct); - Add a Product
app.delete('/products/:designation', products.deleteProduct); - Delete a product
app.put('/products/:designation/brand', products.updateBrand); - Update product brand 
app.put('/products/:designation/type', products.updateType); - Update product type
app.put('/products/:designation/description', products.updateDesc); - Update description
app.put('/products/:designation/price', products.updatePrice); - Update product price


//voucher endpoints 

app.get('/vouchers', vouchers.listAll);  - List all vouchers
app.get('/vouchers/:id', vouchers.findByID); - Find one voucher by ID
app.post('/vouchers', vouchers.addVoucher); - Add a voucher
app.delete('/vouchers/:id', vouchers.deleteVoucher); - Delete a voucher
app.put('/vouchers/:id/value', vouchers.updateValue); - Update voucher value

## Data storage.
Specified below is the database schema, i.e. JSON document structure for each collection type in the MongoDB database.

//Beacons schema

var BeaconSchema = new mongoose.Schema({

   name: { type: String, required: true, lowercase: true},
   venue: { type: String, required: true},
   platform: { type: String, required: true},
   active: { type: Boolean, required: true},
   date: { type: Date, default: Date.now }
});

//Products schema

var ProductSchema = new mongoose.Schema({

   brand: { type: String, required: true},
   type: { type: String, required: true},
   description: { type: String, required: true},
   price: { type: Number, required: true},
   designation: { type: String, required: true, lowercase: true},
   date: { type: Date, default: Date.now }
});


//Vouchers schema

var VoucherSchema = new mongoose.Schema({

   type: { type: String, required: true, lowercase: true},
   value: { type: Number, required: true},
   description: { type: String, required: true},
   active: { type: Boolean, required: true},
   date: { type: Date, default: Date.now }
});

## Sample Test execution.

          Shane-Walshs-MacBook-Pro-2:Beacon Management Web App shanewalsh$ npm run test

          > beacon-management-web-app@0.0.0 test /Users/shanewalsh/Documents/Software Systems Dev/Web App Dev/SSD4/Beacon Management Web App
          > NODE_ENV=test mocha test/routes/ || true



            Beacon Endpoints
              Get All /beacons
          connected to database
          GET /beacons 200 22.871 ms - 322
                ✓ should return all beacons (67ms)
              Get One /beacons/name
          GET /beacons/testbeacon1 200 10.366 ms - 160
                ✓ should return only one beacon by name
          GET /beacons/invalid 200 4.064 ms - 31
                ✓ should show message when beacon not found
              POST /beacons
          POST /beacons 200 269.283 ms - 27
                ✓ should show message if beacon Added (275ms)
          POST /beacons 200 2.567 ms - 40
                ✓ should show message if beacon already exists
              DELETE /beacons/:name
          DELETE /beacons/testbeacon1 200 10.954 ms - 29
                ✓ should delete beacon from collection by name + confirm
              GET /beacons/:status/active
          GET /beacons/status/active 200 8.234 ms - 161
                ✓ should list all active beacons


##Data input samples

//Add beacon
{"name": "beacon10", "venue": "Homestore and More", "platform": "Eddystone", "active": true}

//Update Beacon 
{"venue": "Homebase"}
{"platform": "Eddystone"}

//Beacon Set active
{"active": true}
{"active": false}

//Add product
{"brand": "Panasonic", "type": "Electronics", "description": "4k LCD TV", "price": 400, "designation":"Beacon10"}

//Update Product
{"brand": "Philips"}
{"type": "Footware"}
{"description": "Nike trainers"}
{"price": 200}

//Add Voucher
{"type": "Coupon", "value": 50, "description": "Digital Loyalty Deal", "active": true}

//Update voucher
{"value": 100}


##Source-control 
Git used for local source control. Branch -> Edit -> Merge workflow. When a feature is fully implemented and functioning correctly I pushed to Github remote server. Repo address at top of this report. 

##References  - inline references also included in code

REF: SSD4 Web App Dev course material lab 2 + 3
https://ddrohan.github.io/wit-wad/topic02-node/book-b-lab02/index.html#/06
REF: http://mongoosejs.com/docs/queries.html
REF: https://stackoverflow.com/questions/42541791/how-do-i-perform-a-find-query-in-mongoose
REF: https://docs.mongodb.com/v3.2/reference/method/db.collection.findOneAndUpdate/
REF: http://snipref.com/uncategorized/mongoose-js-find-with-regex/
REF:https://stackoverflow.com/questions/45736636/mongoose-remove-a-entire-object-from-a-nested-array
REF: https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
REF: https://alexanderzeitler.com/articles/mongoose-referencing-schema-in-properties-and-arrays/
REF: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
REF: SSD4 Agile S/W Practice course material Lab 6 API testing
REF: https://www.terlici.com/2014/09/15/node-testing.html
REF: https://github.com/JavaTheNutt/web_app_dev_project_backend/tree/master/test
REF: https://www.sitepoint.com/sinon-tutorial-javascript-testing-mocks-spies-stubs/
REF: https://groundberry.github.io/development/2016/12/10/testing-express-with-mocha-and-chai.html
REF: http://chaijs.com/api/bdd/
REF: http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/#.Wf3v42-7WRt
REF: https://mochajs.org
REF: https://gist.github.com/yoavniran/1e3b0162e1545055429e#mocha
REF: https://stackoverflow.com/questions/40309713/how-to-send-query-string-parameters-using-supertest
REF: https://stackoverflow.com/questions/37129668/how-to-write-post-request-to-node-js-server-using-mocha-and-what-are-the-js-need