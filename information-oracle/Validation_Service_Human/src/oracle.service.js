require('dotenv').config();
const axios = require("axios");


async function getPrice(pair) {
  return {
    symbol: pair,
    price: "Russia"  // This is the text we're looking for
  };
}
  
  module.exports = {
    getPrice,
  }
