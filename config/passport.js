var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

//It will tell the user how to store the user in the session
passport.serializeUser(function(user, done) {
    done(null, user.id); //it tells when u store the user in the session serialize by id
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    emailField: 'email',
    passwordField: 'password',
    usernameField: 'username',
    passReqToCallback: true
}, function(req, email, password, done) {
    console.warn(req);
    req.checkBody('username', 'Invalid username').notEmpty();
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Your password should be of at least 8 characters').notEmpty().isLength({ min: 2 });
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, req.flash('error', messages));
    }
    User.findOne({ 'email': req.param('email') }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false, { message: 'Email is already in use.' });
        }
        var newUser = new User();
        newUser.username = req.param('username');
        newUser.email = req.param('email');
        newUser.password = newUser.encryptPassword(req.param('password'));
        newUser.roles = "SUPERADMIN";
        newUser.status = true;
        newUser.save(function(err, result) {
            if (err) {
                return done(err);
            }
            return done(null, result);
        });
    });

}));



passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({ 'email': email }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: 'No User Found.' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Wrong Password.' });
        }
        return done(null, user);
    });
}));