/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  let dataFeed = {
    users: true,
    roles: true
  };
  if (await Users.count() > 0) {
    dataFeed.users = false;
  }
  //
  if (dataFeed.users) {
    await Users.createEach([
      { username: 'admin', password: 'admin', role: 'admin', loginType: 'local' }
      // etc.
    ]);
  }
 

  if (await Roles.count() > 0) {
    dataFeed.roles = false;
  }
  //
  if (dataFeed.roles) {
    await Roles.createEach([
      { name: 'admin' },
      { name: 'customer' },
      { name: 'user' }
      // etc.
    ]);
  }



  // ```

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
