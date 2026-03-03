// latest movies
export const fetchLatestMovies = async () => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/now_playing?api_key=${process.env.TMDB_API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`TMDB Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching latest movies:", error.message);
    throw error;
  }
};

// trending movies
export const fetchTrendingMovies = async () => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`TMDB Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching trending movies:", error.message);
    throw error;
  }
};

// search movies by query
export const searchMoviesByQuery = async (query) => {
  try {
    if (!query || query.trim() === "") {
      return [];
    }

    const params = new URLSearchParams({
      api_key: process.env.TMDB_API_KEY,
      query,
    });

    const response = await fetch(`${TMDB_BASE_URL}/search/movie?${params}`);

    if (!response.ok) {
      throw new Error(`TMDB Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error searching movies:", error.message);
    throw error;
  }
};

// top rated movies
export const fetchTopRatedMovies = async () => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/top_rated?api_key=${process.env.TMDB_API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`TMDB Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching top rated movies:", error.message);
    throw error;
  }
};

// upcoming movies
export const fetchUpcomingMovies = async () => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/upcoming?api_key=${process.env.TMDB_API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`TMDB Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching upcoming movies:", error.message);
    throw error;
  }
};

// discover movies
export const fetchDiscoverMovies = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams({
      api_key: process.env.TMDB_API_KEY,
      ...filters,
    });

    const response = await fetch(
      `${TMDB_BASE_URL}/discover/movie?${queryParams}`,
    );

    if (!response.ok) {
      throw new Error(`TMDB Error: ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error discovering movies:", error.message);
    throw error;
  }
};

// movie providers
export const fetchMovieProviders = async (movieId, region = "NG") => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}/watch/providers?api_key=${process.env.TMDB_API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`TMDB Error: ${response.status}`);
    }

    const data = await response.json();

    return data.results?.[region] || null;
  } catch (error) {
    console.error("Error fetching providers:", error.message);
    throw error;
  }
};
