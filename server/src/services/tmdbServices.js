// latest movies
export const fetchLatestMovies = async () => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/now_playing?api_key=${process.env.TMDB_API_KEY}`,
  );

  const data = await response.json();
  return data.results;
};

// trending movies
export const fetchTrendingMovies = async () => {
  const response = await fetch(
    `${TMDB_BASE_URL}/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`,
  );
  const data = await response.json();
  return data.results;
};

// search movies by query
export const searchMoviesByQuery = async (query) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}`,
  );
  const data = await response.json();
  return data.results;
};

// top rated movies
export const fetchTopRatedMovies = async () => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/top_rated?api_key=${process.env.TMDB_API_KEY}`,
  );
  const data = await response.json();
  return data.results;
};

// upcoming movies
export const fetchUpcomingMovies = async () => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/upcoming?api_key=${process.env.TMDB_API_KEY}`,
  );
  const data = await response.json();
  return data.results;
};

// discover movies
export const fetchDiscoverMovies = async () => {
  const response = await fetch(
    `${TMDB_BASE_URL}/discover/movie?api_key=${process.env.TMDB_API_KEY}`,
  );
  const data = await response.json();
  return data.results;
};

// movie providers
export const fetchMovieProviders = async (movieId, region = "NG") => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}/watch/providers?api_key=${process.env.TMDB_API_KEY}&watch_region=${region}`,
  );
  const data = await response.json();
  return data.results[region] || null;
};
