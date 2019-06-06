const OktaJwtVerifier = require('@okta/jwt-verifier');
module.exports = function (req, res, next) {
    'user strict';
    // Sockets
    if (req.isSocket) {
        if (req.session &&
            req.session.passport &&
            req.session.passport.user) {
            return next();
        }

        res.json(401);
    }
    // HTTP
    else {

        if (req.isAuthenticated() && req.session && req.session.passport && req.session.passport.user) {
            let user = req.session.passport.user;
            req['username'] = user['email'] || user['nameID'];
            req['loginType'] = 'okta';
            req['user'] = user;
            req['user']['loginType'] = 'okta';
            next();
        } else {
            let logToInsert = {
                username: req['username'],
                url: req.url,
                method: req.method,
                logInfo: {
                    ipAddress: req.connection.remoteAddress,
                    message: 'SAML token is invalid'
                },
                logStatus: "FAILED"
            };
            Auditlog.create(logToInsert).exec(() => {
                return res.status(400).json({ error: 'please send authorization token to access this api' });
            });
        }
    }
};