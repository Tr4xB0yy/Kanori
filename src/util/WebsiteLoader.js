var express = require('express')
var app = express()

class WebsiteLoader {
  constructor () {
    this.loadWebsite(app)
  }
  loadWebsite (eapp) {
    app.get('/', function (req, res) {
      console.log('Got a GET request on / > Sending HOME page');
      res.sendFile('/app/src/website/index.html')
    });
    app.get('/dashboard', function (req, res) {
      console.log("Got GET request on /dashboard > SENDING DASHBOARD PAG")
      res.sendFile('/app/src/website/dashboard.html')
    });
    app.get('/dashboard.html', function (req, res) {
      console.log("GOT GET REQUEST ON /dashboard.html > SENDING DASHBOARD PAG")
      res.sendFile('/app/src/website/dashboard.html')
    });
    app.listen(process.env.PORT || 3000, function () {
      console.log("Website Listener is listing...");
    });
  }
}

module.exports = WebsiteLoader

// Now, we need export our express app to use it on DBL Webhook system
exports.app = app