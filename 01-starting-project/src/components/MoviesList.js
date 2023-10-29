import React from "react";

import Movie from "./Movie";
import classes from "./MoviesList.module.css";

const MovieList = (props) => {
  return (
    <ul className={classes["movies-list"]}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          // movie.id parent app.js ko yaha pr pass hoga
          onDelete={() => props.deleteMovieHandler(movie.id)}
        />
      ))}
    </ul>
  );
};

export default MovieList;
