'use strict';
require('dotenv');
const req = require('superagent');

exports.chattyWishList = (req, res) => {
  console.log(11111, process.env)
  // const response = "This is a sample response from your webhook!" //Default response from the webhook to show it's working
  // res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
  // res.send(JSON.stringify({"sessionId":"0ee56394-3e4d-4dbe-af8e-08b629be9c0b", "speech": response, "displayText": "response", "source" : "response", "data" : {}, "contextOut" : [], "query":"weather", "lang" : "en", "timezone": "America/Los_Angeles" }));


  console.log(2, req);
  const data = 'arry+poter+phonix';
  const refinedKeywords = checkKeywords(data)
  .then(refined => {
    console.log(3, refined)
    return refined;
  });
  const foundResults = callFindingAPI(refinedKeywords)
  .then(results => {
    console.log(1, results);
    return results
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
    'SECURITY-APPNAME': process.env._,
    'APPNAME': process.env._,
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
      'SECURITY-APPNAME': process.env._,
      'APPNAME': process.env._,
      'GLOBAL-ID': 'EBAY-US'
    })
    .then(searchResults => {
      console.log(searchResults);
      return searchResults;

    })

};
