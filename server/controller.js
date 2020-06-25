const db = require('../models/index.js');
const redis = require('../database/redis.js');
const expirationTime = 24 * 60;

module.exports = {
  ticker: {
    get: (req, res) => {
      const url = req.originalUrl;
      const id = req.params.id;
      db.getStockTicker(id)
        .then((data) => {
          redis.set(url, JSON.stringify(data), 'EX', expirationTime);
          res.send(data);
        })
        .catch((err) => {
          console.log(`database error: `, err);
          res.sendStatus(500);
        });
    },
  },
  analysis: {
    get: (req, res) => {
      const url = req.originalUrl;
      db.performAnalysis()
        .then((data) => {
          redis.set(url, JSON.stringify(data), 'EX', expirationTime);
          res.send(data);
        })
        .catch((err) => console.log(`Error performing analysis`, err));
    },
  },
};
