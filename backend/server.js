const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/movies", (req, res) => {
  db.query("SELECT * FROM movies", (err, results) => {
    if (err) {
      console.error("Error fetching movies:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});


app.post("/movies", (req, res) => {
  const { title, director, genre, release_year, rating } = req.body;
  const sql =
    "INSERT INTO movies (title, director, genre, release_year, rating) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [title, director, genre, release_year, rating],
    (err, result) => {
      if (err) {
        console.error("Error inserting movie:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res
        .status(201)
        .json({ message: "Movie added", movieId: result.insertId });
    }
  );
});

app.put("/movies/:id", (req, res) => {
  const { id } = req.params;
  const { title, director, genre, release_year, rating } = req.body;
  const sql =
    "UPDATE movies SET title=?, director=?, genre=?, release_year=?, rating=? WHERE id=?";
  db.query(
    sql,
    [title, director, genre, release_year, rating, id],
    (err, result) => {
      if (err) {
        console.error("Error updating movie:", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Movie not found" });
      }
      res.json({ message: "Movie updated" });
    }
  );
});


app.delete("/movies/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM movies WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting movie:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json({ message: "Movie deleted" });
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
