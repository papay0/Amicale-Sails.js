/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  var APP_ID = "7QQK76M2m62I4GU6gWcarKx9p6CgLbM8zvMojc4A";
  var REST_API_KEY = "EX7QK1D3JGIlmWkp8KEKuqICMZljwhV0PC4aZNsn";

  Parse = require('parse').Parse;
  Parse.initialize("7QQK76M2m62I4GU6gWcarKx9p6CgLbM8zvMojc4A", "EX7QK1D3JGIlmWkp8KEKuqICMZljwhV0PC4aZNsn");
  cb();
};
