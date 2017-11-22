'use strict';
require('dotenv');
const req = require('superagent');

const chattyWishList = async req => {
  console.log(2, req.body.queryResult.parameters.search_item);
  const data = req.body.queryResult.parameters.search_item;
  const refinedKeywords = await checkKeywords(data);
  console.log(3, refinedKeywords);
  const foundResults = await callFindingAPI(refinedKeywords);
  console.log(4, foundResults);
}

const checkKeywords = async keywords => {
  console.log(5, keywords);
  const refinedKeywords = await req
    .get('https://svcs.ebay.com/services/search/FindingService/v1')
    .send({
      'OPERATION-NAME': 'getSearchKeywordsRecommendation',
      'SERVICE-VERSION': '1.0.0',
      'RESPONSE-DATA-FORMAT': 'JSON',
      keywords: keywords,
      'SECURITY-APPNAME': process.env._,
      APPNAME: process.env._,
      'GLOBAL-ID': 'EBAY-US'
    });
  console.log(6, refinedKeywords);
  return refinedKeywords;
};

const callFindingAPI = async refinedKeywords => {
  console.log(7, refinedKeywords);
  const searchResults = await req
    .get('https://svcs.ebay.com/services/search/FindingService/v1')
    .send({
      'OPERATION-NAME': 'findItemsByKeywords',
      'SERVICE-VERSION': '1.0.0',
      'RESPONSE-DATA-FORMAT': 'JSON',
      keywords: refinedKeywords,
      'SECURITY-APPNAME': process.env._,
      APPNAME: process.env._,
      'GLOBAL-ID': 'EBAY-US'
    });
  console.log(8, searchResults);
  return searchResults;
};

module.exports = chattyWishList