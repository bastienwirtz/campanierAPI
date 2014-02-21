#!/usr/bin/env node

/**
 * Campanier API
 * Created by Bastien Wirtz <bastien.wirtz@gmail.com>
 *
 * @see http://www.lecampanier.com/
 */

// Basic parameters handling
switch(process.argv.pop()) {
  case 'update':
    update();
    break;

  default:
    run();
}

/**
 * Run api server
 */
function run() {
  var config   = require('./modules/config.js');
  var services = require('./modules/services.js');
  var restify  = require('restify');

  var server = restify.createServer({
    name : config.api.name
  });

  server.use(restify.queryParser());
  server.use(restify.bodyParser());
  server.use(restify.CORS());

  server.listen(config.api.port, config.api.listenIp, function(){
    console.log('%s listening at %s ', server.name , server.url);
  });

  server.get({path: '/', version: config.api.version} , services.hello);
  server.get({path: '/baskets', version: config.api.version} , services.getBaskets);
};



/**
 * Update item list in database
 */
function update() {
  var request = require('request');
  var config  = require('./modules/config.js');
  var crypto  = require('crypto');

  config.dataSources.baskets.forEach(function (basketSource){
    request({url: basketSource.url, proxy: config.http.proxy }, function(err, resp, body) {
      if (err)
        throw err;

      var db = require("mongojs").connect(config.db.url, config.db.collections);

      var scraperMod = require('./modules/scraping.js');
      var scraper    = scraperMod(body);
      var basket     = scraper.extractBasket();

      basket.type = basketSource.id;
      basket.sum  = crypto.createHash('md5').update(JSON.stringify(basket)).digest("hex");

      db.paniers.findOne({ sum: basket.sum }, function (err, doc) {
        if (err)
          throw err;

        if (!doc)
          db.paniers.save(basket);
      });
   });
  });
};
