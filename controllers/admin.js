exports.logout = function(req, res, next) {
    req.session.destroy()
    req.logout()
    res.redirect('/user/signin')
}

exports.middleware = function(req, res, next) {
    res.render('admin/admin_home/dashboard', { title: 'Luxtripasia Admin', layout: '../admin/layouts/adminlayout' });
};

exports.middlewareproviders = function(req, res, next) {
    res.render('admin/admin_home/providers', { title: 'Luxtripasia Admin', layout: '../admin/layouts/adminlayout' });

};