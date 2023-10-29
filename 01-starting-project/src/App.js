import React, { useState, useCallback, useEffect } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryTimeoutId, setRetryTimeoutId] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://movies-api-2f315-default-rtdb.firebaseio.com/movies.json"
      );
      // response.ok एक method है जो देखता है कि response में कोई गलती है या नहीं।
      // अगर कोई गलती नहीं है, तो यह true return करता है, नहीं तो false
      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }
      const data = await response.json();
      console.log(data);

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
      // time function call किए जाने पर ID देता है। clearTimeout(ID) को कॉल करके function को हटाया जा सकता है।
      setRetryTimeoutId(setTimeout(fetchMoviesHandler, 5000));
    }
    setIsLoading(false);
  }, []);

  function cancelRetryHandler() {
    clearTimeout(retryTimeoutId); // Cancel the retry
    setRetryTimeoutId(null); // Clear the timeout ID
  }

  // uef
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://movies-api-2f315-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  // ye id children se mil rahi hain in this case movieslist se
  const deleteMovieHandler = async (id) => {
    const response = await fetch(
      `https://movies-api-2f315-default-rtdb.firebaseio.com/movies/${id}.json`,
      { method: "DELETE" }
    );
    if (!response.ok) {
      throw new Error("Error in Deleting");
    }
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    setMovies(updatedMovies);
  };

  let content = <p>Found no movies.</p>;
  if (movies.length > 0) {
    content = (
      <MoviesList movies={movies} deleteMovieHandler={deleteMovieHandler} />
    );
  }
  if (error) {
    content = (
      <div>
        <p>{error}</p>
        <button onClick={cancelRetryHandler}>Cancel Retry</button>
      </div>
    );
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
