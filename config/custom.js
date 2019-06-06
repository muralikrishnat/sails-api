/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/
  // mailgunDomain: 'transactional-mail.example.com',
  // mailgunSecret: 'key-testkeyb183848139913858e8abd9a3',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …

  
  oktaConfig: {
    issuer: "http://www.okta.com/sfdsfsdxxsdfdsfdxdsfsd",
    entryPoint: "https://sdfsdf-508930.oktapreview.com/app/dfdsfsdfsdf508930_xxxxxxxxsamllocal_1/dfsdfsdfsdfsdfdsfsf/sso/saml",
    callbackUrl: "http://localhost:1337/api/authorization-code/callback",
    cert: "fgfdgfgfdgfgdfgdfgdfgdfgfdgfdgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfg",
    uiCallback: "http://localhost:8080/authorization-code/callback"
  },

  mailConfig: {
    host: 'XX.XXX.X.XX',
    port: 25,
    requestAccessMailAddress: 'xxxxxxxxxxx.t@xxxxxxxxxxxx.com'
  }

};
