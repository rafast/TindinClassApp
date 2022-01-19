const passport = require('passport');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send('You must be signed in first!');
    }
    next();
}

module.exports.isTokenValid = (req, res, next) => {
    passport.authenticate(
        'bearer',
        { session: false },
        (erro, user, info) => {
            if (erro && erro.name === 'JsonWebTokenError') {
                return res.status(401).json({ erro: erro.message });
            }

            if (erro && erro.name === 'TokenExpiredError') {
                return res
                    .status(401)
                    .json({ erro: erro.message, expiredIn: erro.expiredAt });
            }

            if (erro) {
                return res.status(500).json({ erro: erro.message });
            }

            if (!user) {
                return res.status(401).json();
            }

            req.token = info.token;
            req.user = user;
            return next();
        }
    )(req, res, next);
};