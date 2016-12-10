var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var user = require('../controllers/user');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('user/profile');
});

router.get('/logout', isLoggedIn, user.logout);


router.use('/', isLoggedIn, function(req, res, next) {
    next();
});

router.get('/signup', user.signupmiddleware);

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/signin',
    failureRedirect: '/user/signup',
    failureFlash: true
}));

router.get('/signin', user.signinmiddleware);

router.post('/signin', passport.authenticate('local.signin'),
    function(req, res) {
        if (req.user.roles == 'USER') {
            res.redirect('/user/profile');
        } else if (req.user.roles == 'ADMIN') {
            res.redirect('/admin');
        } else if (req.user.roles == 'SUPERADMIN') {
            res.redirect('/superadmin/profile');
        } else {
            res.redirect('/user/signin');
        }
    }
);


module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated() || req.path == '/signin' || req.path == '/signup') {
        return next();
    }
    res.redirect('/user/signin');
}