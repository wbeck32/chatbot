'use strict';
require('dotenv');
const req = require('superagent');

exports.chattyWishList = (req, res) => {
  console.log(2, req);
  const data = 'arry+poter+phonix';
  const refinedKeywords = checkKeywords(data);
  callFindingAPI(data)
  .then(results => {
    console.log(1, results);

  });
};

function checkKeywords(keywords) {
  return req
  .get('https://svcs.ebay.com/services/search/FindingService/v1')
  .send({
    'OPERATION-NAME': 'getSearchKeywordsRecommendation',
    'SERVICE-VERSION': '1.0.0',
    'RESPONSE-DATA-FORMAT': 'JSON',
    'keywords': keywords,
    'SECURITY-APPNAME': process.env.SECURITY-APPNAME,
    'GLOBAL-ID': 'EBAY-US'
  })
  .then(refinedKeywords => {
    console.log(refinedKeywords);
    return refinedKeywords;

  })


}

function callFindingAPI(keywords) {
  return req
    .get('https://svcs.ebay.com/services/search/FindingService/v1')
    .send({
      'OPERATION-NAME': 'findItemsByKeywords',
      'SERVICE-VERSION': '1.0.0',
      'RESPONSE-DATA-FORMAT': 'JSON',
      'keywords': keywords,
      'SECURITY-APPNAME': process.env.SECURITY-APPNAME,
      'GLOBAL-ID': 'EBAY-US'
    })
    .then(searchResults => {
      console.log(searchResults);
      return searchResults;

    })

};
