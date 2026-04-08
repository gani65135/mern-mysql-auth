const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itemController");

// ✅ Correct usage
router.get("/", itemController.getItems);
router.post("/", itemController.addItem);
router.delete("/:id", itemController.deleteItem);

module.exports = router;
