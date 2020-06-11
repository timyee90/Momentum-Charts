const { Pool } = require('pg');
const { config } = require('./config.js');

const pool = new Pool({
  host: config.HOST,
  port: config.PORT,
  user: config.USER,
  password: config.PASSWORD,
  database: 'stocks',
});

module.exports = {
  query: (text, value) => {
    return pool.query(text, value);
  },
  pool: pool,
};
