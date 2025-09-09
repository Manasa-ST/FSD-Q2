import React, { useState } from "react";

const MovieDelete = ({ movieId, onDeleted }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    setLoading(true);
    await fetch(`http://localhost:5001/movies/${movieId}`, {
      method: "DELETE",
    });
    setLoading(false);
    if (onDeleted) onDeleted();
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition disabled:opacity-50"
      disabled={loading}
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
};

export default MovieDelete;
