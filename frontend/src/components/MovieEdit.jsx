import React, { useState } from "react";

const MovieEdit = ({ movie, onUpdated }) => {
  const [form, setForm] = useState(movie);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch(`http://localhost:5000/movies/${movie.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (onUpdated) onUpdated();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-yellow-50 shadow-xl rounded-2xl mb-8 border border-yellow-200 flex flex-col gap-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-block text-3xl text-yellow-600">✏️</span>
        <h2 className="text-2xl font-extrabold text-yellow-700 tracking-tight">
          Edit Movie
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
          required
        />
        <input
          name="director"
          value={form.director}
          onChange={handleChange}
          placeholder="Director"
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
          required
        />
        <input
          name="genre"
          value={form.genre}
          onChange={handleChange}
          placeholder="Genre"
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
          required
        />
        <input
          name="release_year"
          value={form.release_year}
          onChange={handleChange}
          placeholder="Release Year"
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
          required
        />
        <input
          name="rating"
          value={form.rating}
          onChange={handleChange}
          placeholder="Rating"
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-yellow-500 text-white font-bold px-6 py-3 rounded-xl shadow transition disabled:opacity-50 mt-4"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default MovieEdit;
