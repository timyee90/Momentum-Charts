const { Pool } = require('pg');
const { config } = require('./config.js');

const pool = new Pool({
  host: config.HOST,
  port: config.PORT,
  user: config.USER,
  password: config.PASSWORD,
});

module.exports.getStock = (ticker) => {
  return pool.query(`SELECT * from ${ticker}`);
};
