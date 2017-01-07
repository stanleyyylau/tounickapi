/**
 * Created by Stanley on 1/7/17.
 */

var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  var config = require('./config.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}

module.exports = function(){
  const mongoose = require('mongoose');
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGODB_URI);

  mongoose.connection.on('error', () => {
    console.log('error');
})
}