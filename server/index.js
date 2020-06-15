const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');
const router = require('./router.js');
const app = express();

app.use(morgan('dev'));
app.use(compression());
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

app.use(express.static(path.join(__dirname, '../client/')));
app.use('/', router);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening of port: ${port}`));
