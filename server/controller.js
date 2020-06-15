const db = require('../models/index.js');

module.exports = {
  ticker: {
    get: (req, res) => {
      console.log(req.params.id);
      const id = req.params.id;
      db.getStockTicker(id)
        .then((data) => {
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
      db.performAnalysis()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => console.log(`Error performing analysis`, err));
    },
  },
};
