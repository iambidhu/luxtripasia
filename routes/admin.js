var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var app = express();

var admin = require('../controllers/admin');


var csrfProtection = csrf();
router.use(csrfProtection);


router.get('/logout', isLoggedIn, admin.logout);


router.use('/', isLoggedIn, function(req, res, next) {
    next();
});
/* GET home page. */

router.get('/', isAdmin, admin.middleware);

router.get('/admin_home/providers', isAdmin, admin.middlewareproviders);


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