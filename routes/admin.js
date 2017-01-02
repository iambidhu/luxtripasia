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
    Provider.find({ user_id: req.user.id }, function(err, providers) {
        if (err) {
            assert.equal(null, err);
            return;
        }
        res.render('admin/admin_home/providers', { items: providers, layout: '../admin/layouts/adminlayout' });
    })

    /*var resultArray = [];
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
    })*/

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
    /*console.warn(req.destinations.name);*/
    Destination.find({ user_id: req.user.id }, function(err, destinations) {
        if (err) {
            assert.equal(null, err);
            return;
        }
        res.render('admin/admin_home/destination', { items: destinations, layout: '../admin/layouts/adminlayout' });
    });
    // var resultArray = [];
    // mongo.connect(url, function(err, db) {
    //     assert.equal(null, err);
    //     var cursor = db.collection('destinations').find({ user_id: req.user.id });
    //     cursor.forEach(function(doc, err) {
    //         assert.equal(null, err);
    //         resultArray.push(doc);
    //         console.warn(resultArray);
    //     }, function() {
    //         db.close();
    //         res.render('admin/admin_home/destination', { items: resultArray, layout: '../admin/layouts/adminlayout' });
    //     });
    // })

});


router.delete('/admin_home/destination/delete/:id', function(req, res) {
    Destination.remove({ "_id": objectId(req.params.id) }, function(err, result) {
        console.warn(result);
        assert.equal(null, err);
        console.log('Item Deleted');
    })
    res.render('admin/admin_home/destination', { items: destinations, layout: '../admin/layouts/adminlayout' });
});

//Update destination
router.put('/admin_home/destination/update/:id', function(req, res, next) {

    var destination = {
        name: req.body.name,
        updated_at: Date.now()
    };
    console.warn(destination);
    var id = req.body.id;
    Destination.findOneAndUpdate({ '_id': objectId(req.params.id) }, { $set: destination }, function(err, result) {
        assert.equal(null, err);
        console.log('Item updated');

    });
    res.redirect('/admin/admin_home/destination');
});
// Creating Provider Db and checking for Duplicate Value
router.post('/admin_home/providers', isAdmin, function(req, res, next) {

    req.checkBody('name', 'Name Field Require').notEmpty();
    req.checkBody('email', 'Email Id Required').isEmail();
    req.checkBody('mobile', 'Mobile Number Required').notEmpty();
    var errors = req.validationErrors();
    console.warn(errors);
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        res.render('admin/admin_home/providers', { title: 'Providers', layout: '../admin/layouts/adminlayout', errors: messages });
    } else {
        Provider.findOne({ name: req.body.name, email: req.body.email }, function(err, provider) {
            if (provider) {
                res.render('admin/admin_home/providers', { title: 'Providers', layout: '../admin/layouts/adminlayout', message: "Already Exists" });
                return true;
            }

            var newProvider = new Provider({
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                address: req.body.address,
                city: req.body.city,
                zipcode: req.body.zipcode,
                state: req.body.state,
                country: req.body.country,
                user_id: req.user.id
            });
            newProvider.save(function(err, result) {

                console.log("Data Inserted");
                console.warn(err);
                assert.equal(null, err);
                res.render('admin/admin_home/providers', { title: 'Providers', layout: '../admin/layouts/adminlayout', message: err });

            });

        });
    }
});

//

// Creating Destinations Db and checking for Duplicate Value
router.post('/admin_home/destination', isAdmin, function(req, res, next) {

    req.checkBody('name', 'Destination Field Require').notEmpty();

    var errors = req.validationErrors();
    console.warn(req.body.name);
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        /*return done(null, req.flash('error', messages));*/
        res.render('admin/admin_home/destination', { title: 'Destination', layout: '../admin/layouts/adminlayout', message: messages });
        console.warn(messages);
    } else {

        Destination.findOne({ name: req.body.name }, function(err, destination) {
            if (destination) {
                res.render('admin/admin_home/destination', { title: 'Destination', layout: '../admin/layouts/adminlayout', message: "Already Exists" });
                return true;
            }
            var newDestination = new Destination({
                name: req.body.name,
                user_id: req.user.id
            });
            newDestination.save(function(err, result) {

                console.log("Data Inserted");
                console.warn(err);
                assert.equal(null, err);
                res.render('admin/admin_home/destination', { title: 'Destination', layout: '../admin/layouts/adminlayout', message: err });
            });

        });

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