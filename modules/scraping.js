/**
 * Scriping crap goes here :p
 */

module.exports = function(rawHtml) {
  return {
    extractBasket: function() {
      var $ = require('cheerio').load(rawHtml);

      var basket = {};

      // Extract name and price from the title
      var title     = $('.TitreDetailPB h2').text();
      var re        = /(.*)\((\d+).€\)/;  
      var titleData = re.exec(title);  
      basket.name   = titleData[1];
      basket.price  = titleData[2];

      // Extact basket content and providers
      var content        = $('.BodyDetailPB .ColorText:not(.TextStrong)').remove('span');
      var itemsType      = content.first().text().split("\r\n").map(Function.prototype.call, String.prototype.trim);
      var itemsProviders = content.last().text().split("\r\n").map(Function.prototype.call, String.prototype.trim);
            
      basket.content = new Array();
      itemsType.forEach(function (type, index){
        basket.content.push({ name: type, provider: itemsProviders[index]});
      });
      
      return basket;
    }
  };
}
