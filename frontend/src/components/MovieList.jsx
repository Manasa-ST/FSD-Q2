import React, { useEffect, useState } from "react";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="text-center py-8 text-lg text-gray-500">Loading...</div>
    );

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-block text-3xl text-blue-600">📽️</span>
        <h2 className="text-2xl font-extrabold text-blue-700 tracking-tight">
          Movie List
        </h2>
      </div>
      <ul className="grid gap-6">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="bg-gradient-to-br from-blue-50 to-gray-100 shadow-lg rounded-2xl p-6 border border-blue-200 flex flex-col gap-2 hover:scale-[1.02] transition"
          >
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
