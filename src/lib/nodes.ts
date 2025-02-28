import { openAiNodeAnswer } from "./open_ai_node";
import { claudeNodeAnswer } from "./anthropic_node";

export async function getNodeAnswer(userQuery: string) {
    const answerFunctions = [openAiNodeAnswer, claudeNodeAnswer];
    const randomIndex = Math.floor(Math.random() * answerFunctions.length);

    return await answerFunctions[randomIndex](userQuery);    
}