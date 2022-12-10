import React, { useState, useEffect } from "react";
import { Movie } from "src/entities/Movie";
import { getMovies, refreshMovies } from "src/services/movie";

export const useMovies = () => {
  const [paginatedMovies, setpaginatedMovies] = useState<Array<Movie[]>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [pagesLoaded, setPagesLoaded] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showError, setError] = useState(false);

  const currentPageMovies = paginatedMovies[currentPage - 1] || [];

  const fetchMovies = async () => {
    try {
      setError(false);
      setLoading(true);

      const movies = await getMovies();

      setpaginatedMovies([movies.data]);
      setCurrentPage(1);
      setPagesLoaded(1);
      setLastPage(movies.meta.lastPage);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async (page: number) => {
    const notFetchedYet = page > pagesLoaded;
    const exceeded = page > lastPage;

    try {
      if (notFetchedYet && !exceeded) {
        const currentMovies = [...paginatedMovies];

        const movies = await getMovies(page);

        currentMovies[page - 1] = movies.data;
        setpaginatedMovies(currentMovies);
        setPagesLoaded(page);
      }
    } catch (error) {
      setError(true);
      setCurrentPage(page - 1);
    }
  };

  const refresh = async () => {
    try {
      setError(false);
      setLoading(true);

      await refreshMovies();
      await fetchMovies();
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMore(currentPage);
  }, [currentPage]);

  return {
    currentPageMovies,
    lastPage,
    loading,
    showError,
    currentPage,
    getMovies: fetchMovies,
    setPage: setCurrentPage,
    refresh,
    setError,
    paginatedMovies,
  };
};
