const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Working");
});

// ✅ LOGIN API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email, password],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "DB error" });
      }

      if (result.length === 0) {
        return res.status(401).json({ msg: "Invalid credentials" });
      }

      res.json({
        msg: "Login success",
        user: result[0],
        token: "dummy-token",
      });
    }
  );
});

// ✅ GET ALL TASKS
app.get("/api/items", (req, res) => {
  db.query("SELECT * FROM items", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ✅ ADD TASK
app.post("/api/items", (req, res) => {
  const { title, description, status } = req.body;

  db.query(
    "INSERT INTO items (title, description, status) VALUES (?, ?, ?)",
    [title, description, status],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: "Task added" });
    }
  );
});

// ✅ DELETE TASK
app.delete("/api/items/:id", (req, res) => {
  db.query(
    "DELETE FROM items WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: "Task deleted" });
    }
  );
});

// ✅ START SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
