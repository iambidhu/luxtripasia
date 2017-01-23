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

exports.middlewarepackages = function(req, res, next) {
    res.render('admin/admin_home/packages', { title: 'Luxtripasia Admin:Packages', layout: '../admin/layouts/adminlayout' })
}

exports.middlewareaccomodation = function(req, res, next) {
    res.render('admin/admin_home/accomodation', { title: 'Luxtripasia Admin:Accomodations', layout: '../admin/layouts/adminlayout' });
}

exports.middlewarenewaccomodation = function(req, res, next) {
    res.render('admin/admin_home/accomodation-new', { title: 'Add Accommodation', layout: '../admin/layouts/adminlayout' });
}