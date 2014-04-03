exports.login = function (req, res) {
    res.render('login', { user: req.user });
}

exports.loginWithGoogle = function (req, res, next) {
    req.session.redirect = req.query.redirect;
    next();
}

exports.loginWithGoogleCallback = function (req, res) {
    res.redirect(req.session.redirect || '/account');
    delete req.session.redirect;
}

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
}