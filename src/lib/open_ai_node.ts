import OpenAI from "openai";

// Move the client initialization inside the function to prevent startup errors
export async function openAiNodeAnswer(userQuery: string) {
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

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI error:', error);
    return "Error processing request";
  }
}