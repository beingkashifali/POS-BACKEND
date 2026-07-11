const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getProducts,
  addProducts,
  updateProducts,
  deleteProducts,
} = require("../controllers/product");
const router = express.Router();

router.get("/", authMiddleware, getProducts);
router.post("/", authMiddleware, addProducts);
router.patch("/:id", authMiddleware, updateProducts);
router.delete("/:id", authMiddleware, deleteProducts);

module.exports = router;
