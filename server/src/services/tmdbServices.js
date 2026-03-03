export const fetchLatestMovies = async () => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/now_playing?api_key=${process.env.TMDB_API_KEY}`,
  );

  const data = await response.json();
  return data.results;
};

export const fetchTrendingMovies = async () => {
  const response = await fetch(
    `${TMDB_BASE_URL}/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`,
  );
  const data = await response.json();
  return data.results;
};

export const searchMoviesByQuery = async (query) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}`,
  );
  const data = await response.json();
  return data.results;
};

export const fetchTopRatedMovies = async () => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/top_rated?api_key=${process.env.TMDB_API_KEY}`,
  );
  const data = await response.json();
  return data.results;
};

export const fetchUpcomingMovies = async () => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/upcoming?api_key=${process.env.TMDB_API_KEY}`,
  );
  const data = await response.json();
  return data.results;
};

export const fetchMovieProviders = async (movieId) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}/watch/providers?api_key=${process.env.TMDB_API_KEY}`,
  );
  const data = await response.json();
  return data.results;
};
