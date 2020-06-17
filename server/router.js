const router = require('express').Router();
const controller = require('./controller.js');
const redis = require('../database/redis.js');

const checkCache = (req, res, next) => {
  const url = req.originalUrl;

  redis.get(url, (err, data) => {
    if (err) {
      console.log(`Error: `, err);
      res.send(500);
    }
    if (data !== null && data !== undefined) {
      res.send(JSON.parse(data));
    } else {
      next();
    }
  });
};

const useCache = true;

if (useCache === true) {
  router.get('/ticker/:id', checkCache, controller.ticker.get);
  router.get('/top25', checkCache, controller.analysis.get);
} else {
  router.get('/ticker/:id', controller.ticker.get);
  router.get('/top25', controller.analysis.get);
}

module.exports = router;
