var products = require('../models/products');
var express = require('express');
var router = express.Router();
var Product = require('../models/products');

router.findAll = function(req, res) {

    // find all beacons
    Product.find(function(err, products) {
        if (err || !products)
            res.send(err);

        res.json(products);
    });
}

router.findOne = function(req, res) {

    // find a single product based on beacon designation
    Product.findOne({ "designation" : req.params.designation },function(err, product) {

        if (err || !product)
            res.json({ message: 'Product NOT Found!' } );
        else
            res.json(product);
    });
}

router.addProduct = function(req, res) {

    // Check if Product is already designated to a beacon
    Product.findOne({ "designation": req.body.designation}, function(err, product) {

        if (err || !product) {

            //Add a NEW product
            var newProduct = new Product();

            newProduct.designation = req.body.designation;
            newProduct.price = req.body.price;
            newProduct.description = req.body.description;
            newProduct.type = req.body.type;
            newProduct.brand = req.body.brand;


            // Save the product and check for errors
            newProduct.save(function (err) {
                if (err)
                    res.send(err);

                res.json({message: 'Product Added!'});
            });
        } else
            res.json({message: 'A Product is already designated to this Beacon'});
    });
}

router.deleteProduct = function(req, res) {

    //Delete based on the Beacon it is assigned to (Only one product per beacon)
    Product.findOneAndRemove({"designation":req.params.designation}, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Product Deleted!'});
    });
}

router.updateBrand = function(req, res) {

    if(req.body.brand === null || req.body.brand === "")
        res.json({ message: 'Invalid Input!'});

    else {
        //Find product brand by beacon designation and then update
        Product.findOneAndUpdate({"designation": req.params.designation}, {$set: {brand: req.body.brand}}, function (err, product) {
            if (err)
                res.send(err);

            res.json({message: 'Brand Updated!'});
        });
    }
}

router.updateType = function(req, res) {

    if(req.body.type === null || req.body.type === "")
        res.json({ message: 'Invalid Input!'});

    else {
        //Find product type by beacon designation and then update
        Product.findOneAndUpdate({"designation": req.params.designation}, {$set: {type: req.body.type}}, function (err, product) {
            if (err)
                res.send(err);

            res.json({message: 'Product Type Updated!'});
        });
    }
}

router.updateDesc = function(req, res) {

    if(req.body.description === null || req.body.description === "")
        res.json({ message: 'Invalid Input!'});

    else {
        //Find product description by beacon designation and then update
        Product.findOneAndUpdate({"designation": req.params.designation}, {$set: {description: req.body.description}}, function (err, product) {
            if (err)
                res.send(err);

            res.json({message: 'Product Description Updated!'});
        });
    }
}

router.updatePrice = function(req, res) {

    if(req.body.price === null || req.body.price === "")
        res.json({ message: 'Invalid Input!'});

    else {
        //Find product price by beacon designation and then update
        Product.findOneAndUpdate({"designation": req.params.designation}, {$set: {price: req.body.price}}, function (err, product) {
            if (err)
                res.send(err);

            res.json({message: 'Product Price Updated!'});
        });
    }
}

router.partialSearch = function (req, res) {

    // Partial search for Brands
    Product.find({"brand": {"$regex": req.query.brand, "$options": "i"}}, function(err, product) {

        if(err || !product)
            res.json({ message: 'Query NOT Found!' });
        else
            res.json(product);
    });
}

module.exports = router;