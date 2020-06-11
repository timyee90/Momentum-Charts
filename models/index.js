const db = require('../database/index.js');

module.exports.getStockTicker = (ticker) => {
  ticker = 'aapl';
  return db.query(`SELECT * from ${ticker}`, []).catch((err) => {
    console.log(`Error in model layer: `, err);
  });
};

module.exports.insertStock = (ticker, jsonData) => {
  if (ticker !== undefined) {
    (async () => {
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
    })().catch((e) => console.error(e.stack));
  }
};
