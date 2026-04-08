const db = require("../config/db");

// ✅ GET all items
exports.getItems = (req, res) => {
  db.query("SELECT * FROM items", (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    res.json(results);
  });
};

// ✅ ADD item
exports.addItem = (req, res) => {
  const { title, description, status } = req.body;


  db.query(
    "INSERT INTO items (title, description, status) VALUES (?, ?, ?)",
    [title, description, status],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      res.json({ msg: "Item added" });
    }
  );
};

// ✅ DELETE item
exports.deleteItem = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM items WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    res.json({ msg: "Item deleted" });
  });
};
