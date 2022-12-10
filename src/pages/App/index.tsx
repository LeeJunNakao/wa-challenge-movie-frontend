import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "src/components/Card";
import Pagination from "src/components/Pagination";
import Button from "@mui/material/Button";
import { useMovies } from "./hooks";

import * as S from "./styles";

function App() {
  const {
    getMovies,
    currentPageMovies,
    setPage,
    currentPage,
    lastPage,
    loading,
    refresh,
  } = useMovies();

  useEffect(() => {
    getMovies();
  }, []);

  const MoviesCards = currentPageMovies.map((m) => (
    <Card key={m.externalId} image={m.banner} {...m} />
  ));

  return (
    <S.Page>
      <Typography variant="h2" sx={{ display: "flex", alignItems: "center" }}>
        W.A.{" "}
        <img
          height={80}
          src="http://stitchplease.weebly.com/uploads/3/8/4/4/3844953/6561830.jpg?420"
          alt="W.A. Moves - Studio Ghibli"
        ></img>{" "}
        Movies
      </Typography>

      <S.RefreshWrapper>
        <Button variant="outlined" color="inherit" onClick={refresh}>
          Refresh
        </Button>
      </S.RefreshWrapper>

      <S.PaginationWrapper>
        <Pagination
          currentPage={currentPage}
          setPage={setPage}
          totalPage={lastPage}
        />
      </S.PaginationWrapper>

      {loading ? (
        <CircularProgress data-testid="loading-icon" color="inherit" />
      ) : currentPageMovies.length ? (
        <S.MoviesDisplay>{MoviesCards}</S.MoviesDisplay>
      ) : (
        <Typography test-id="no-items-message" variant="h4">
          No items
        </Typography>
      )}

      <S.PaginationWrapper>
        <Pagination
          currentPage={currentPage}
          setPage={setPage}
          totalPage={lastPage}
        />
      </S.PaginationWrapper>
    </S.Page>
  );
}

export default App;
