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
var Category = require('../models/category');

var admin = require('../controllers/admin');

/*var url = 'mongodb://localhost:27017/luxtripasia';*/


router.get('/logout', isLoggedIn, admin.logout);


router.use('/', isLoggedIn, function(req, res, next) {
    next();
});
/* GET home page. */

router.get('/', isAdmin, admin.middleware);






//Accomodation Routes

router.get('/admin_home/accomodation', isAdmin, admin.middlewareaccomodation);

//router.get('/admin_home/accomodation-new', isAdmin, admin.middlewarenewaccomodation);

router.get('/admin_home/providers', isAdmin, function(req, res, next) {
    /*console.warn(req.user);*/
    Provider.find({ user_id: req.user.id }, function(err, providers) {
        if (err) {
            assert.equal(null, err);
            return;
        }
        res.render('admin/admin_home/providers', { items: providers, layout: '../admin/layouts/adminlayout' });
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
    /*console.warn(req.destinations.name);*/
    Destination.find({ user_id: req.user.id }, function(err, destinations) {
        if (err) {
            assert.equal(null, err);
            return;
        }
        res.render('admin/admin_home/destination', { items: destinations, layout: '../admin/layouts/adminlayout' });
    });
});

//Get Categories
router.get('/admin_home/categories', isAdmin, function(req, res, next) {
    Category.find({ user_id: req.user.id }, function(err, category) {
        if (err) {
            assert.equal(null, err);
            return;
        }
        res.render('admin/admin_home/categories', { items: category, layout: '../admin/layouts/adminlayout' });
    });
});

// Get Categories For Accomodation Page
router.get('/admin_home/accomodation-new', isAdmin, function(req, res, next) {
    Category.find({ user_id: req.user.id }, function(err, category) {
        if (err) {
            assert.equal(null, err);
            return;
        }
        res.render('admin/admin_home/accomodation-new', { categories: category, layout: '../admin/layouts/adminlayout' });
    });
});


// Delete Categories

router.delete('/admin_home/categories/delete/:id', function(req, res) {
    Category.remove({ "_id": objectId(req.params.id) }, function(err, result) {
        console.warn(result);
        assert.equal(null, err);
        console.warn('Item Deleted');
    })
    res.render('admin/admin_home/categories', { items: categories, layout: '../admin/layouts/adminlayout' });
});

//Update Categories

router.put('/admin_home/categories/update/:id', function(req, res, next) {
    var updatedcategory = {
        name: req.body.name,
        updated_at: Date.now()
    };

    var id = req.body.id;
    Category.findOneAndUpdate({ '_id': objectId(req.params.id) }, { $set: updatedcategory }, function(err, result) {
        assert.equal(null, err);
        console.log('Item updated');
    });
    res.redirect('/admin/admin_home/categories');

})


/* Get  Packages Image Load Page*/

router.get('/admin_home/fileupload', isAdmin, function(req, res, next) {
    res.render('admin/admin_home/fileupload', { title: 'Upload Image', layout: '../admin/layouts/adminlayout' });
});

//Delete Destinations 

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


//Update provider
router.put('/admin_home/provider/update/:id', function(req, res, next) {
    var provider = {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address,
        city: req.body.city,
        zipcode: req.body.zipcode,
        state: req.body.state,
        country: req.body.country,
        updated_at: Date.now()
    };
    console.warn("Provide is:", provider);
    var id = req.body.id;
    Provider.findOneAndUpdate({ '_id': objectId(req.params.id) }, { $set: provider }, function(err, result) {
        assert.equal(null, err);
        console.log('Item updated');
    });
    res.redirect('/admin/admin_home/providers');
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

// Creating Categories Db and checking for Duplicate Value
router.post('/admin_home/categories', isAdmin, function(req, res, next) {

    req.checkBody('name', 'Category Field Require').notEmpty();

    var errors = req.validationErrors();
    console.warn(req.body.name);
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        /*return done(null, req.flash('error', messages));*/
        res.render('admin/admin_home/categories', { title: 'Categories', layout: '../admin/layouts/adminlayout', message: messages });
        console.warn(messages);
    } else {

        Category.findOne({ name: req.body.name }, function(err, category) {
            if (category) {
                res.render('admin/admin_home/categories', { title: 'Categories', layout: '../admin/layouts/adminlayout', message: "Already Exists" });
                return true;
            }
            var newCategory = new Category({
                name: req.body.name,
                user_id: req.user.id
            });
            newCategory.save(function(err, result) {

                console.log("Data Inserted");
                console.warn(err);
                assert.equal(null, err);
                res.render('admin/admin_home/categories', { title: 'Categories', layout: '../admin/layouts/adminlayout', message: err });
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
    if (req.user.roles == ("ADMIN" || "SUPERADMIN")) {
        return next();
    }
    res.redirect('/');
}