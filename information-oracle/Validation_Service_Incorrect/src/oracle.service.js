require('dotenv').config();
const axios = require("axios");


async function getAnswer(pair) {
  return {
    answer: "San Francisco"  // This is WRONG
  };
}
  
  module.exports = {
    getAnswer,
  }
