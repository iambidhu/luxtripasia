var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var app = express();
var mongo = require('mongodb');
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var validator = require('express-validator');
var Provider = require('../models/providers');
var Destination = require('../models/destination');

var admin = require('../controllers/admin');

var url = 'mongodb://localhost:27017/luxtripasia';




router.get('/logout', isLoggedIn, admin.logout);


router.use('/', isLoggedIn, function(req, res, next) {
    next();
});
/* GET home page. */

router.get('/', isAdmin, admin.middleware);

//router.get('/admin_home/providers', isAdmin, admin.middlewareproviders);

router.get('/admin_home/providers', isAdmin, function(req, res, next) {
    /*console.warn(req.user);*/
    var resultArray = [];
    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        var cursor = db.collection('providers').find({ user_id: req.user.id });
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function() {
            db.close();
            res.render('admin/admin_home/providers', { items: resultArray, layout: '../admin/layouts/adminlayout' });

        });
    })

});

router.delete('/admin_home/providers/delete/:id', function(req, res) {

    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection('providers').deleteOne({ "_id": objectId(req.params.id) }, function(err, result) {
            assert.equal(null, err);
            console.log('Item deleted');
            db.close();
        });
    });

});

router.get('/admin_home/destination', isAdmin, function(req, res, next) {
    console.warn(req.providers);
    var resultArray = [];
    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        var cursor = db.collection('destination').find({ user_id: req.user.id });
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function() {
            db.close();
            res.render('admin/admin_home/destination', { items: resultArray, layout: '../admin/layouts/adminlayout' });

        });
    })

});

router.delete('/admin_home/destination/delete/:id', function(req, res) {

    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection('destination').deleteOne({ "_id": objectId(req.params.id) }, function(err, result) {
            assert.equal(null, err);
            console.log('Item deleted');
            db.close();
        });
    });

});

router.post('/admin_home/providers', isAdmin, function(req, res, next) {

    req.checkBody('name', 'Name Field Require').notEmpty();
    req.checkBody('email', 'Email Id Required').notEmpty().isEmail();
    req.checkBody('mobile', 'Mobile Number Required').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        res.render('admin/admin_home/providers', { title: 'Destination', layout: '../admin/layouts/adminlayout', errors: messages });
    } else {
        var newProvider = {
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            address: req.body.address,
            city: req.body.city,
            zipcode: req.body.zipcode,
            state: req.body.state,
            country: req.body.country,
            user_id: req.user.id
        }
        mongo.connect(url, function(err, db) {
            assert.equal(null, err);
            db.collection('providers').insertOne(newProvider, function(err, result) {
                assert.equal(null, err);
                console.log("Date Inserted");
                db.close();
            });
        });
        res.redirect('/admin/admin_home/providers');
    }
});

router.post('/admin_home/destination', isAdmin, function(req, res, next) {

    req.checkBody('name', 'Destination Field Require').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        /*return done(null, req.flash('error', messages));*/
        res.render('admin/admin_home/destination', { title: 'Destination', layout: '../admin/layouts/adminlayout', message: messages });
        console.warn(messages);
    } else {
        var newDestination = {
            name: req.body.name,
            user_id: req.user.id
        }
        mongo.connect(url, function(err, db) {
            assert.equal(null, err);
            db.collection('destination').insertOne(newDestination, function(err, result) {
                assert.equal(null, err);
                console.log("Date Inserted");
                db.close();
            });
        });
        res.redirect('/admin/admin_home/destination');
    }
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated() || req.path == '/signin' || req.path == '/signup') {
        return next();
    }
    res.redirect('/user/signin');
}

function isAdmin(req, res, next) {
    if (req.user.roles == "ADMIN") {
        return next();
    }
    res.redirect('/');
}