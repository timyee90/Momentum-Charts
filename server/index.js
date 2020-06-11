const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const db = require('../models/index.js');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(compression());

app.get('/ticker/:id', (req, res) => {
  const id = req.params.id;
  db.getStockTicker(id)
    .then((data) => {
      res.send(data.rows);
    })
    .catch((err) => {
      console.log(`database error: `, err);
      res.sendStatus(500);
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening of port: ${port}`));
