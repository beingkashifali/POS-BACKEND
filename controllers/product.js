const productModel = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.json({ products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addProducts = async (req, res) => {
  try {
    const newProduct = new productModel(req.body);
    await newProduct.save();
    res.status(201).json({ newProduct, success: true, msg: "Product Added!" });
  } catch (err) {
    res.status(500).json({ error: err.message, msg: "Error saving product" });
  }
};

const updateProducts = async (req, res) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ updatedProduct, success: true, msg: "Product Updated!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProducts = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    res.json({
      msg: "Product Deleted Successfully.",
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message, msg: "Failed to Delete Product!" });
  }
};

module.exports = { getProducts, addProducts, updateProducts, deleteProducts };
