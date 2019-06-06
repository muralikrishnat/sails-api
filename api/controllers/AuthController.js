/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const passport = require('passport');
const nodemailer = require("nodemailer");
module.exports = {
    login: function (req, res) {
        passport.authenticate('saml', function (err, user, info) {
            if ((err) || (!user)) {
                return res.send({
                    message: info.message,
                    user
                });
            }
            req.logIn(user, function (err) {
                if (err) res.send(err);
                return res.send({
                    message: info.message,
                    user
                });
            });
        })(req, res);
    },
    authorizationCallBack: function(req, res){
        let uiCallbackUrl = sails.config.custom.oktaConfig['uiCallback'] || '';
        passport.authenticate('saml', function (err, user, info) {
            if ((err) || (!user)) {
                return res.view('pages/authcallback', {
                    message: "Authorization callback",
                    user,
                    uiCallbackUrl
                });
            }
            req.logIn(user, function (err) {
                if (err) {
                    return res.view('pages/authcallback', {
                        message: "Authorization callback",
                        err,
                        uiCallbackUrl
                    });
                } else {
                    return res.view('pages/authcallback', {
                        message: "Authorization callback",
                        user,
                        uiCallbackUrl
                    });
                }
            });
        })(req, res);
    },
    getAuthorizationCallBack: function(req, res){
        let uiCallbackUrl = sails.config.custom.oktaConfig['uiCallback'] || '';
        return res.view('pages/authcallback', {
            message: "Authorization callback",
            user: req.user,
            uiCallbackUrl
        });
    },
    logout: function (req, res) {
        req.logout();
        res.redirect('/');
    },
    apiRoot: function (req, res) {
        res.notFound();
    },
    version: function (req, res) {
        res.ok({ version: '0.1.3' })
    },
    sendUserRequest: function (req, res) {
        var smtpTransport = nodemailer.createTransport({
            host: sails.config.custom.mailConfig.host,
            port: sails.config.custom.mailConfig.port
        });
        let mailParams = req.body;
        var mailOptions = {
            to: sails.config.custom.mailConfig.requestAccessMailAddress,
            subject: 'Requesting xxxxxxxx access',
            text: 'I ' + (mailParams.name || '') + ' wanna access xxxxxxxx',
            html: 'I ' + (mailParams.name || '') + ' wanna access xxxxxxxx'
        }
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log("Message sent: " + response.message);
            }
            res.ok({ sentMail: true });
        });
        
    },
    checkEmailRequest: function (req, res) {
        var smtpTransport = nodemailer.createTransport({
            host: sails.config.custom.mailConfig.host,
            port: sails.config.custom.mailConfig.port
        });
        let mailParams = req.body;
        var mailOptions = {
            from: sails.config.custom.mailConfig.fromAddress,
            to: mailParams.to || sails.config.custom.mailConfig.requestAccessMailAddress,
            bcc: sails.config.custom.mailConfig.mailBcc,
            subject: sails.config.custom.mailConfig.mailSubject,
            text: mailParams['text'] || ('I ' + (mailParams.name || '') + ' wanna access xxxxxxxx'),
            html: `
            <!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title><!--[if !mso]><!-- --><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
            .ReadMsgBody { width:100%; }
            .ExternalClass { width:100%; }
            .ExternalClass * { line-height:100%; }
            body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
            table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
            img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
            p { display:block;margin:13px 0; }</style><!--[if !mso]><!--><style type="text/css">@media only screen and (max-width:480px) {
              @-ms-viewport { width:320px; }
              @viewport { width:320px; }
            }</style><!--<![endif]--><!--[if mso]>
          <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
          </xml>
          <![endif]--><!--[if lte mso 11]>
          <style type="text/css">
            .outlook-group-fix { width:100% !important; }
          </style>
          <![endif]--><!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"><style type="text/css">@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);</style><!--<![endif]--><style type="text/css">@media only screen and (min-width:480px) {
          .mj-column-per-30 { width:30% !important; max-width: 30%; }
  .mj-column-per-70 { width:70% !important; max-width: 70%; }
  .mj-column-per-100 { width:100% !important; max-width: 100%; }
        }</style><style type="text/css">@media only screen and (max-width:480px) {
        table.full-width-mobile { width: 100% !important; }
        td.full-width-mobile { width: auto !important; }
      }</style></head><body><div><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="Margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:0px;text-align:center;vertical-align:top;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:180px;" ><![endif]--><div class="mj-column-per-30 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tbody><tr><td style="vertical-align:top;padding:0px;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tr><td align="left" style="font-size:0px;padding:25px 0;word-break:break-word;"><table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:150px;"><img height="auto" src="https://stg-xxxxxxxx.xxxxxxxx.com/images/login-logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="150"></td></tr></tbody></table></td></tr></table></td></tr></tbody></table></div><!--[if mso | IE]></td><td class="" style="vertical-align:top;width:420px;" ><![endif]--><div class="mj-column-per-70 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tbody><tr><td style="vertical-align:top;padding:0px;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tr><td align="left" style="font-size:0px;padding:22px 0;word-break:break-word;"><div style="font-family:sans-serif;font-size:26px;line-height:1;text-align:left;color:#f05500;"><h3 align="right" style="margin: 0;">xxxxxxxx<sup>®</sup></h3></div></td></tr></table></td></tr></tbody></table></div><!--[if mso | IE]></td><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tbody><tr><td style="vertical-align:top;padding:0px;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tr><td style="font-size:0px;padding:0px;word-break:break-word;"><p style="border-top:solid 1px #F45E43;font-size:1;margin:0px auto;width:100%;"></p><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #F45E43;font-size:1;margin:0px auto;width:600px;" role="presentation" width="600px" ><tr><td style="height:0;line-height:0;"> &nbsp;
  </td></tr></table><![endif]--></td></tr><tr><td align="left" style="font-size:0px;padding:30px 0;word-break:break-word;">
  <div style="font-family:sans-serif;font-size:16px;line-height:1;text-align:left;color:#000;">
  <h4 style="margin: 0;">Following user is requesting access to xxxxxxxx Application</h4></div>
  </td></tr><tr><td align="left" style="font-size:0px;padding:0px;word-break:break-word;">
  <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">
  <h5 color="#ccc" style="margin: 5px 0; font-weight: normal;">Firstname:</h5><h3 style="margin: 0;">${mailParams.firstname}</h3></div>
  </td></tr><tr><td align="left" style="font-size:0px;padding:0px;padding-top:20px;word-break:break-word;">
  <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">
  <h5 color="#ccc" style="margin: 5px 0; font-weight: normal;">Lastname:</h5><h3 style="margin: 0;">${mailParams.lastname}</h3>
  </div></td></tr><tr><td align="left" style="font-size:0px;padding:0px;padding-top:20px;word-break:break-word;">
  <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">
  <h5 color="#ccc" style="margin: 5px 0; font-weight: normal;">Email:</h5><h3 style="margin: 0;">${mailParams.from}</h3>
  </div></td></tr><tr><td align="left" style="font-size:0px;padding:0px;padding-top:20px;word-break:break-word;">
  <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">
  <h5 color="#ccc" style="margin: 5px 0; font-weight: normal;">Company:</h5><h3 style="margin: 0;">${mailParams.company}</h3>
  </div></td></tr>
  
    <tr>
    
        <td align="left" style="font-size:0px;padding:0px;padding-top:20px;word-break:break-word;">
                <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">
                    <h5 color="#ccc" style="margin: 5px 0; font-weight: normal;">Contact Number:</h5><h3 style="margin: 0;">${mailParams.contact}</h3>
                </div>
        </td>
    </tr>

    <tr>
    
    <td align="left" style="font-size:0px;padding:0px;padding-top:20px;word-break:break-word;">
            <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">
                    <h5 color="#ccc" style="margin: 5px 0; font-weight: normal;">Country:</h5><h3 style="margin: 0;">${mailParams.country}</h3>
                </div>
        </td>
    </tr>

  </table>
  
  </td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div>
  <!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>
            `
        }
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log("Message sent: " + response.message);
            }
            res.ok({ sentMail: true });
        });
        
    }
};

