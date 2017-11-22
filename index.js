'use strict';
require('dotenv');
const req = require('superagent');

exports.chattyWishList = (req, res) => {

  console.log(2, req.body.queryResult.parameters.search_item);
  const data = req.body.queryResult.parameters.search_item;
  const refinedKeywords = checkKeywords(data)
  .then(refined => {
    console.log(3, refined)
    return refined;
  });
  const foundResults = callFindingAPI(refinedKeywords)
  .then(results => {
    console.log(4, results);
    return results
  });
};

function checkKeywords(keywords) {
  console.log(5, keywords)
  return req
  .get('https://svcs.ebay.com/services/search/FindingService/v1')
  .send({
    'OPERATION-NAME': 'getSearchKeywordsRecommendation',
    'SERVICE-VERSION': '1.0.0',
    'RESPONSE-DATA-FORMAT': 'JSON',
    'keywords': keywords,
    'SECURITY-APPNAME': process.env._,
    'APPNAME': process.env._,
    'GLOBAL-ID': 'EBAY-US'
  })
  .then(refinedKeywords => {
    console.log(6, refinedKeywords);
    return refinedKeywords;

  })
}

function callFindingAPI(keywords) {
  console.log(7, keywords)
  return req
    .get('https://svcs.ebay.com/services/search/FindingService/v1')
    .send({
      'OPERATION-NAME': 'findItemsByKeywords',
      'SERVICE-VERSION': '1.0.0',
      'RESPONSE-DATA-FORMAT': 'JSON',
      'keywords': keywords,
      'SECURITY-APPNAME': process.env._,
      'APPNAME': process.env._,
      'GLOBAL-ID': 'EBAY-US'
    })
    .then(searchResults => {
      console.log(8, searchResults);
      return searchResults;

    })

};
