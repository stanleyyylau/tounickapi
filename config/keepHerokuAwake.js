/**
 * Created by Stanley on 1/7/17.
 */

var http = require("http");

module.exports = function () {
  setInterval(function() {
    http.get("https://tounickapi.herokuapp.com");
  }, 300000); // every 5 minutes (300000)
}

