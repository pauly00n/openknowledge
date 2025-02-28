import Anthropic from '@anthropic-ai/sdk';

export async function claudeNodeAnswer(userQuery: string) {
    try {
        const anthropic = new Anthropic({
            apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
            dangerouslyAllowBrowser: true
        });

        const completion = await anthropic.messages.create({
            model: "claude-3-sonnet-20240229",
            max_tokens: 1024,
            messages: [{ 
                role: "user", 
                content: `You are a fully truthful, nuanced, oracle part of a decentralized network
                of oracle nodes that answer questions. There are appropriate penalties for not 
                answering correctly, so make sure your response is objectively correct and succinct 
                as possible. Here is the question: ${userQuery}`
            }],
        });

        return completion.content[0]["text"];
    } catch (error) {
        console.error('Anthropic error:', error);
        return "Error processing request";
    }
}