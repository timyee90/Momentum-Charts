const axios = require('axios');
const Papa = require('papaparse');
const symbols = require('../symbols/index.js');
const { insertStock } = require('../models/index.js');

const startDate = 0;
const endDate = 4102444800;

const useInterval = false;
const interval = 24 * 60 * 1000;

// get request to yahoo finance for a specific ticker
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

// scrapes one stock ticker
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

// scrapes a list of stock tickers
const scrapeAll = (symbols) => {
  const promiseArray = symbols.map((symbol) => {
    return scrapeOne(symbol);
  });
  return Promise.all(promiseArray);
};

// execute the stock scaper
const fullScape = () => {
  scrapeAll(symbols)
    .then(() => console.log(`--- Done updating database ---`))
    .catch((err) => {
      console.log(`Error Updating database: `, err);
    });
};

// automate the stock scraper
const automateScape = (repeat) => {
  fullScape();
  if (repeat) {
    setInterval(fullScape, interval);
  }
};

automateScape(useInterval);

module.exports = {
  getTicker: getTicker,
};
