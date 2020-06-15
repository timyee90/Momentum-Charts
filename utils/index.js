module.exports.percentChange = (priceBefore, priceAfter) => {
  return (priceAfter / priceBefore - 1) * 100;
};
