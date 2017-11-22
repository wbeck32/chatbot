'use strict';
require('dotenv');
const req = require('superagent');
const querystring = require('querystring');

exports.chattyWishList = (req, res) => {
  const queryString = {
    session:
      'projects/chatbot-search-4bfd3/agent/sessions/0ee56394-3e4d-4dbe-af8e-08b629be9c0b',
    responseId: '3cb18e49-a58e-4df4-857d-1cd037e6fc28',
    queryResult: {
      parameters: {
        zip_code: '87890',
        local_search: 'nearby',
        budget: {
          amount: 40,
          currency: 'USD'
        },
        condition: 'new',
        search_item: 'bickcle'
      }
    }
  };
  // console.log(2, req.queryResult.parameters.search_item)
  const data = queryString.queryResult.parameters.search_item;
  // const data = 'arry+poter+phonix';

  return checkKeywords(data)
    .then(refined => {
      console.log(3, refined.text);
      return refined;
    })
    .then(refinedKeywords => {
      return callFindingAPI(refinedKeywords).then(results => {
        console.log(4, results.body);
        res.send(results);
      });
    });
};

const checkKeywords = data => {
  console.log(5, data);
  const query = querystring.stringify({
    'OPERATION-NAME': 'getSearchKeywordsRecommendation',
    'SERVICE-VERSION': '1.0.0',
    'RESPONSE-DATA-FORMAT': 'JSON',
    keywords: data,
    'SECURITY-APPNAME': '',
    'GLOBAL-ID': 'EBAY-US'
  });

  return req
    .get('https://svcs.ebay.com/services/search/FindingService/v1')
    .query(query)
    .then(refinedKeywords => {
      console.log(6, refinedKeywords.text);
      return refinedKeywords;
    });
};

const callFindingAPI = keywords => {
  console.log(7, keywords.text);
  const query2 = querystring.stringify({
    'OPERATION-NAME': 'findItemsByKeywords',
    'SERVICE-VERSION': '1.0.0',
    'RESPONSE-DATA-FORMAT': 'JSON',
    keywords: 'bicycle',
    'SECURITY-APPNAME': '',
    'GLOBAL-ID': 'EBAY-US'
  });
  return req
    .get('https://svcs.ebay.com/services/search/FindingService/v1')
    .query(query2)
    .then(searchResults => {
      console.log(8, searchResults.text);
      return searchResults;
    });
};
