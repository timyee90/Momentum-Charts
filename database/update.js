const axios = require('axios');
const Papa = require('papaparse');
const symbols = require('../symbols/index.js');
const { insertStock } = require('../models/index.js');

const startDate = 0;
const endDate = 4102444800;

const getTicker = (ticker) => {
  const baseUrl = `https://query1.finance.yahoo.com/v7/finance/download/${ticker}?period1=${startDate}&period2=${endDate}&interval=1d&events=history`;
  return axios
    .get(baseUrl)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(`Error in fetching from yahoo api: `, err);
    });
};

const scrapeOne = (symbol) => {
  symbol = symbol.replace(/\./g, '');
  return getTicker(symbol)
    .then((data) => {
      if (data !== undefined) {
        const jsonData = Papa.parse(data, { header: true, delimiter: ',' });
        insertStock(symbol, jsonData);
      }
    })
    .catch((err) => {
      console.log(`Error in parsing: `, err);
    });
};

const scrapeAll = (symbols) => {
  const promiseArray = symbols.map((symbol) => {
    return scrapeOne(symbol);
  });
  return Promise.all(promiseArray);
};

scrapeAll(symbols)
  .then(() => console.log(`--- Done updating database ---`))
  .catch((err) => {
    console.log(`Error Updating database: `, err);
  });

module.exports = {
  getTicker: getTicker,
};
