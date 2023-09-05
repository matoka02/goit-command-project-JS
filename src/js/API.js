import axios from "axios";

class ApiService {
  constructor() {
    this.url = 'https://api.themoviedb.org/3/';
    this.key = 'b8b4ca8ae31738ae90c3cb58e4b03190';
    this.searchQuery = '';
    this.page = 1;
    this.idMovie = null;
  };

  async fetchOnMovie() {
    try {
      const result = `${this.url}movie/${this.idMovie}/videos?api_key=${this.key}`;
      const data = await axios.get(result);
      return data
    } catch (error) {
      console.error(error.message);
    }
  };

  async fetchById() {
    try {
      const result = `${this.url}movie/${this.idMovie}?api_key=${this.key}`;
      const data = await axios.get(result);
      return data
    } catch (error) {
      console.error(error.message);
    }
  };

  async fetchDefault() {
    try {
      const result = `${this.url}trending/movie/week?api_key=${this.key}`;
      const data = await axios.get(result);
      return data
    } catch (error) {
      console.error(error.message);
    }
  };

  async fetch() {
    try {
      const searchParams = new URLSearchParams({
        api_key: this.key,
        query: this.searchQuery,
      });
      const result = `${this.url}search/movie?${searchParams}`;
      const data = await axios.get(result);
      return data
    } catch (error) {
      console.error(error.message);
    }
  };

  async fetchPagination(pageNext) {
    try {
      if (this.searchQuery !== '') {
        const searchParams = new URLSearchParams({
          api_key: this.key,
          query: this.searchQuery,
        });
        const result = `${this.url}search/movie?${searchParams}&page=${pageNext}`;
        const data = await axios.get(result);
        return data
      } else {
        const result = `${this.url}trending/movie/week?api_key=${this.key}&page=${pageNext}`;
        const data = await axios.get(result);
        return data
      };
    } catch (error) {
      console.error(error.message);
    }
  };

  get query() {
    return this.searchQuery
  };

  set query(newQuery) {
    this.searchQuery = newQuery
  };

  get movieId() {
    return this.idMovie
  };

  set movieId(movieId) {
    this.idMovie = movieId
  };

  resetPage() {
    this.page = 1
  }
};

export default ApiService;