require('dotenv').config();
import OpenAI from 'openai-api';
const axios = require("axios");


async function getAnswer(userQuery) {
    try {
    const openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true // Add this flag for browser usage
    });
    var answer = "";
    const completion = await openai.chat.completions.create({
      model: "chatgpt-4o-latest",
      messages: [
        {
          role: "system",
          content: `You are a fully truthful, nuanced, oracle part of a decentralized network
          of oracle nodes that answer questions. There are appropriate penalties for not 
          answering correctly, so make sure your response is objectively correct and succinct as possible.` 
        },
        {
          role: "user",
          content: userQuery,
        },
      ],
    });

    answer = completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI error:', error);
    answer = "Error processing request";
  }
  return {
    answer: answer
  };
}
  
  module.exports = {
    getAnswer,
  }
