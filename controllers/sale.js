const saleModel = require("../models/Sale");
const productModel = require("../models/Product");

const createSale = async (req, res) => {
  try {
    const { products, totalAmount } = req.body;
    const newSale = await saleModel({
      products,
      totalAmount,
      cashierId: req.user.id,
    });
    await newSale.save();

    for (const product of products) {
      await productModel.findByIdAndUpdate(product.productId, {
        $inc: { quantity: -product.quantity },
      });
    }
    res.status(201).json({ msg: "Sale successful.", sale: newSale });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSales = async (req, res) => {
  try {
    let query = {};
    if (req.user.role !== "manager") {
      query.cashierId = req.user.id;
    }

    const sales = await saleModel
      .find(query)
      .populate("cashierId", "username    ")
      .sort({ createdAt: -1 });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createSale, getSales };
