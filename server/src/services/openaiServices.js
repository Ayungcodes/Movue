import { OpenAI } from "openai";

const client = new OpenAI({
  apiKey: process.env.MY_OPENAI_API_KEY,
});

export const getMovieRecommendations = async (prompt) => {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      message: [
        {
          role: "system",
          content: `
You are a movie recommendation engine.

Return ONLY JSON in this format:

[
  { "title": "Movie Title" },
  { "title": "Movie Title" }
]

Recommend 5 movies.
No explanation.
        `,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });
    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error("OpenAI error:", error.message);
    throw error;
  }
};
