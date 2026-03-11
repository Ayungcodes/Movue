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
          content:
            "You are a movie recommendation assistant. Recommend movies based on the user's request. Only return a clean list of movie titles.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI error:", error.message);
    throw error;
  }
};
