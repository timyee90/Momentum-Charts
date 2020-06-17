module.exports.percentChange = (priceBefore, priceAfter) => {
  return (priceAfter / priceBefore - 1) * 100;
};

module.exports.movingAverage = (prices, days) => {
  const len = prices.length;
  return (
    prices.slice(len - days, len).reduce((acc, price) => {
      return acc + price;
    }, 0) / days
  );
};

const test = 0;
