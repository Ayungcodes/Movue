const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

export const getLatestMovies = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/movies/latest`);

    if (!res.ok) {
      throw new Error(`Server Error: ${res.status} ${res.statusText}`);
    }

    return { data: await res.json(), error: null };
  } catch (error) {
    console.error("Failed to fetch latest movies:", error.message);
    return { data: null, error: error.message };
  }
};

export const getTrendingMovies = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/movies/trending`);

    if (!res.ok) {
      throw new Error(`Server Error: ${res.status} ${res.statusText}`);
    }

    return { data: await res.json(), error: null };
  } catch (error) {
    console.error("Failed to fetch trending movies:", error.message);
    return { data: null, error: error.message };
  }
};

export const searchMovies = async (query) => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/movies/search?query=${encodeURIComponent(query)}`,
    );

    if (!res.ok) {
      throw new Error(`Server Error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getTopRatedMovies = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/movies/top-rated`);

    if (!res.ok) {
      throw new Error(`Server Error: ${res.status} ${res.statusText}`);
    }

    return { data: await res.json(), error: null };
  } catch (error) {
    console.error("Failed to fetch top rated movies:", error.message);
    return { data: null, error: error.message };
  }
};

export const getUpcomingMovies = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/movies/upcoming`);

    if (!res.ok) {
      throw new Error(`Server Error: ${res.status} ${res.statusText}`);
    }

    return { data: await res.json(), error: null };
  } catch (error) {
    console.error(error.message);
    return { data: null, error: error.message };
  }
};

export const getDiscoverMovies = async (filters) => {
  try {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`${BASE_URL}/api/movies/discover?${query}`);

    if (!res.ok) {
      throw new Error(`Server Error: ${res.status} ${res.statusText}`);
    }

    return { data: await res.json(), error: null };
  } catch (error) {
    console.error(error.message);
    return { data: null, error: error.message };
  }
};

export const getMovieProviders = async (movieId) => {
  try {
    const res = await fetch(`${BASE_URL}/${movieId}/api/movies/providers`);

    if (!res.ok) {
      throw new Error(`Server Error: ${res.status} ${res.statusText}`);
    }

    return { data: await res.json(), error: null };
  } catch (error) {
    console.error(error.message);
    return { data: null, error: error.message };
  }
};
