const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    cashierId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const saleModel = mongoose.model("sale", saleSchema);

module.exports = saleModel;
