module.exports = function sendError(err, extraInfo){

    var req = this.req;
    var res = this.res;
    var sails = req._sails;
    let logToInsert = {
      username: req['username'],
      url: req.url,
      method: req.method,
      logInfo: {
          ipAddress: req.connection.remoteAddress,
          message: err['error'] || 'error while doing operation',
          details: err
      },
      logStatus: "FAILED"
    };
    return Auditlog.create(logToInsert).exec(() => {
      return res.status(200).json(err);
    });
  }