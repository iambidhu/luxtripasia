exports.logout = function(req, res, next) {
    req.session.destroy()
    req.logout()
    res.redirect('/user/signin')
}


exports.signupmiddleware = function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
};

exports.signinmiddleware = function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
};