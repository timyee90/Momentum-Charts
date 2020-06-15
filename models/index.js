const db = require('../database/index.js');
const symbols = require('../symbols/index.js');

module.exports.getStockTicker = (ticker) => {
  return db
    .query(`SELECT * from ${ticker}`, [])
    .then((data) => {
      return data.rows[0].data.data;
    })
    .catch((err) => {
      console.log(`Error in database query: `, err);
    });
};

module.exports.insertStock = async (ticker, jsonData) => {
  if (ticker !== undefined) {
    const client = await db.pool.connect();
    try {
      await client.query(`DROP TABLE IF EXISTS ${ticker};`);
      await client.query(
        `CREATE TABLE ${ticker} (id SERIAL PRIMARY KEY, data json NOT NULL);`
      );
      await client.query(`INSERT INTO ${ticker} (data) values ($1);`, [
        jsonData,
      ]);
    } catch (err) {
      console.log(`Error: `, err);
    } finally {
      client.release();
    }
  }
};

module.exports.performAnalysis = () => {
  // pull all stock data
  // map the data to last 260 trading days
  // sort stock returns
  // return top and bottom stocks
};
