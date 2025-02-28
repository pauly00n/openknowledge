require('dotenv').config();
const dalService = require("./dal.service");
const oracleService = require("./oracle.service");

async function validate(proofOfTask) {

  try {
      const taskResult = await dalService.getIPfsTask(proofOfTask);
      const oracleAnswer = ""
      // Check if the submitted text contains our validation text
      try {
        const openai = new OpenAI({
          apiKey: import.meta.env.VITE_OPENAI_API_KEY,
          dangerouslyAllowBrowser: true // Add this flag for browser usage
        });
        const completion = await openai.chat.completions.create({
          model: "chatgpt-4o-latest",
          messages: [
            {
              role: "system",
              content: `Given the prompt ${userQuery}, respond with ONLY ONE WORD either "True" or "False" 
              based on the truthfulness of the following response: ${taskResult}.` 
            },
            {
              role: "user",
              content: userQuery,
            },
          ],
        });
        oracleAnswer = completion.choices[0].message.content;
      } catch (error) {
        console.error('OpenAI error:', error);
        oracleAnswer =  "Error processing request";
      }
      const isApproved = oracleAnswer === "True"
      return isApproved;
    } catch (err) {
      console.error(err?.message);
      return false;
    }
  }
  
  module.exports = {
    validate,
  }
