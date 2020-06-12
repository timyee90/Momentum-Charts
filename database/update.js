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
      console.log(`Error in fetching from yahoo api: `);
    });
};

const scrapeOne = (symbol) => {
  if (symbol !== undefined) {
    symbol = symbol.replace(/\./g, '');
  }
  if (symbol === undefined) {
    console.log(`- scraping undefined -`);
  }
  getTicker(symbol)
    .then((data) => {
      if (data !== undefined) {
        var jsonData = Papa.parse(data, { header: true, delimiter: ',' });
        delete data;
        insertStock(symbol, jsonData);
      }
    })
    .catch((err) => {
      console.log(`Error in parsing: `, err);
    });
};

const scrapeTop = (symbols) => {
  const promiseArray = [];
  for (let i = 0; i < symbols.length / 2; i++) {
    if (symbols[i] === undefined) {
      console.log(`- 1. pushing an undefined symbol into promiseArray -`);
    } else {
      promiseArray.push(scrapeOne(symbols[i]));
    }
  }
  return Promise.all(promiseArray);
};

const scrapeBot = (symbols) => {
  console.log(
    ` --------------------------------------------- Scraping2 function called`
  );
  const promiseArray = [];
  for (let i = Math.floor(symbols.length / 2); i < symbols.length; i++) {
    if (symbols[i] === undefined) {
      console.log(`- 2. pushing an undefined symbol into promiseArray -`);
    } else {
      promiseArray.push(scrapeOne(symbols[i]));
    }
  }
  return Promise.all(promiseArray);
};

scrapeTop(symbols)
  .then(() => {
    setTimeout(() => {
      console.log(
        `---------------------------------------- Scaping2 Began inside setTimeout`
      );
      scrapeBot(symbols).then(() => console.log(`--- Done Scraping ---`));
    }, 60000);
  })
  .catch((err) => {
    console.log(`Error Updating database: `, err);
  });

module.exports = {
  getTicker: getTicker,
};
