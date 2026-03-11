import { getMovieRecommendations } from "../services/openaiServices.js";
import { searchMoviesByQuery } from "../services/tmdbServices.js";

export const recommendMovies = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const aiMovies = await getMovieRecommendations(prompt);

    const movies = [];

    for (const movie of aiMovies) {
      const results = await searchMoviesByQuery(movie.title);

      if (results.length > 0) {
        movies.push(results[0]);
      }
    }

    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to get AI movies",
    });
  }
};
