module.exports = function ok(json, extraInfo){

    var req = this.req;
    var res = this.res;
    var sails = req._sails;
    let logToInsert = {
      username: req['username'],
      url: req.url,
      method: req.method,
      logInfo: {
          ipAddress: req.connection.remoteAddress
      },
      logStatus: "SUCCESS"
    };
    return Auditlog.create(logToInsert).exec(() => {
      return res.status(200).json({
        data: json['data'] || json
      });
    });
  }