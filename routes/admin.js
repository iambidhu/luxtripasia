var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var app = express();


var csrfProtection = csrf();
router.use(csrfProtection);


router.get('/logout', isLoggedIn, function(req, res, next) {
    req.session.destroy()
    req.logout()
    res.redirect('/user/signin')
});


router.use('/', isLoggedIn, function(req, res, next) {
    next();
});
/* GET home page. */

router.get('/', function(req, res, next) {
    if (req.user.roles == "ADMIN") {
        res.render('admin/admin_home/dashboard', { title: 'Luxtripasia Admin', layout: '../admin/layouts/adminlayout' });
    }

    /*app.set('view options', { layout: 'adminlayout' });*/
});


module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated() || req.path == '/signin' || req.path == '/signup') {
        return next();
    }
    res.redirect('/user/signin');
}