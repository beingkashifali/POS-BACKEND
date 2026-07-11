const express = require("express");
const { getSales, createSale } = require("../controllers/sale");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createSale);
router.get("/", authMiddleware, getSales);

module.exports = router;
