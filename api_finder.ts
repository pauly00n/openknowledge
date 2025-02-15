import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI();

// possible Api objects
const PossibleApis = z.object({
  apis: z.array(
    z.object({
      name: z.string(),
      link: z.string(),
    })
  )
});

export async function findPossibleApis(userQuery: string) {
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Search for possible Apis for the Oracle the user wants to create",
      },
      {
        role: "user",
        content: userQuery, // for example: "Live NBA statistics"
      },
    ],
    response_format: zodResponseFormat(PossibleApis, "PossibleApis"),
  });

  // completion.choices[0].message.parsed is the validated array
  return completion.choices[0].message.parsed;
}