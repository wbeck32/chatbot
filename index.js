'use strict';
require('dotenv');
const req = require('superagent');

exports.chattyWishList = async (req, res) => {
  console.log(2, req);
  const data = 'bicycle';
  const results = await callFindingAPI(data);
  console.log(1, results);
};

const callFindingAPI = async keywords => {
  const searchResults = await req
    .get('https://svcs.ebay.com/services/search/FindingService/v1')
    .send({
      'OPERATION-NAME': 'findItemsByKeywords',
      'SERVICE-VERSION': '1.0.0',
      'RESPONSE-DATA-FORMAT': 'JSON',
      'keywords': keywords,
      'SECURITY-APPNAME': process.env.SECURITY-APPNAME,
      'GLOBAL-ID': 'EBAY-US'
    });

  console.log(searchResults);
  return searchResults;
};
