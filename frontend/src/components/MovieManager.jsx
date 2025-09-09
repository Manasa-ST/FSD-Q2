import React, { useState, useEffect } from "react";
import MovieList from "./MovieList";
import MovieCreate from "./MovieCreate";
import MovieEdit from "./MovieEdit";
import MovieDelete from "./MovieDelete";

const MovieManager = () => {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5001/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, [refresh]);

  const handleCreated = () => setRefresh((r) => !r);
  const handleUpdated = () => {
    setEditingMovie(null);
    setRefresh((r) => !r);
  };
  const handleDeleted = () => setRefresh((r) => !r);

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-gray-100 to-blue-50 min-h-screen rounded-3xl shadow-2xl border border-blue-200">
      <MovieCreate onCreated={handleCreated} />
      {editingMovie && (
        <MovieEdit movie={editingMovie} onUpdated={handleUpdated} />
      )}
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Movie List</h2>
      <ul className="grid gap-6">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="bg-gradient-to-br from-blue-50 to-gray-100 shadow-lg rounded-2xl p-6 border border-blue-200 flex flex-col md:flex-row justify-between items-center gap-4 hover:scale-[1.02] transition"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎬</span>
                <span className="text-lg font-semibold text-gray-800">
                  {movie.title}
                  <span className="text-sm text-gray-500 ml-2">
                    ({movie.release_year})
                  </span>
                </span>
              </div>
              <span className="text-gray-600">
                Director: <span className="font-medium">{movie.director}</span>
              </span>
              <span className="text-gray-600">
                Genre: <span className="font-medium">{movie.genre}</span>
              </span>
              <span className="text-gray-600">
                Rating: <span className="font-medium">{movie.rating}</span>
              </span>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl shadow transition"
                onClick={() => setEditingMovie(movie)}
              >
                Edit
              </button>
              <MovieDelete movieId={movie.id} onDeleted={handleDeleted} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieManager;
