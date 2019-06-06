
var passport = require('passport');
var SamlStrategy = require('passport-saml').Strategy;
let customFile = './custom';
if (process.env['NODE_ENV']) {
    customFile = './env/' + process.env['NODE_ENV'];
}
var envConfig = require(customFile);
let oktaConfig = {};
if (envConfig['custom'] && envConfig['custom']['oktaConfig']) {
    oktaConfig = envConfig['custom']['oktaConfig'];
}
var config = {
    "issuer": oktaConfig.issuer,
    "entryPoint": oktaConfig.entryPoint,
    "callbackUrl": oktaConfig.callbackUrl,
    "cert": oktaConfig.cert,
};

passport.serializeUser(function (user, cb) {
    cb(null, user);
});
passport.deserializeUser(function (user, cb) {
    Users.find({ username: user.email }).exec(function (err, user) {
        cb(err, user);
    });
});

passport.use(new SamlStrategy({
    issuer: config.issuer,
    path: '/authorization-code/callback',
    entryPoint: config.entryPoint,
    cert: config.cert
}, function (profile, done) {
    if (!profile.email) {
        return done(new Error("No email found"), null);
    }
    process.nextTick(function () {
        return done(null, profile);
    });
}));
