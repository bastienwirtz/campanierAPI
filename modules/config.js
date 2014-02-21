/**
 * Config file.
 */

exports.http = {
  proxy: null
}

exports.api = {
  name:     'campanierApi',
  version:  '0.0.1',
  listenIp: '127.0.0.1',
  port:     8080
}

exports.db = {
  url: 'campanier',
  collections: ["paniers"]
}

exports.dataSources = {
  baskets: [
    { id: 1, url: 'http://www.lecampanier.com/PanierBio.aspx?idprod=1551&TP=MIXTE&smid=647'},   // Fruits & legumes
    { id: 2, url: 'http://www.lecampanier.com/PanierBio.aspx?idprod=1549&TP=FRUIT&smid=647'},   // Fruits
    { id: 3, url: 'http://www.lecampanier.com/PanierBio.aspx?idprod=1547&TP=LEGUME&smid=647'},  // Legumes
    { id: 4, url: 'http://www.lecampanier.com/PanierBio.aspx?idprod=1546&TP=GRLEGUME&smid=647'} // Grand legumes
  ]
}
