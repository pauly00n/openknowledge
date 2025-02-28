require('dotenv').config();
const dalService = require("./dal.service");
const oracleService = require("./oracle.service");

async function validate(proofOfTask) {

  try {
      const taskResult = await dalService.getIPfsTask(proofOfTask);
      const validationText = (await oracleService.getAnswer()).price;
      
      // Check if the submitted text contains our validation text
      const isApproved = taskResult.price.toLowerCase().includes(validationText.toLowerCase());
      return isApproved;
    } catch (err) {
      console.error(err?.message);
      return false;
    }
  }
  
  module.exports = {
    validate,
  }
