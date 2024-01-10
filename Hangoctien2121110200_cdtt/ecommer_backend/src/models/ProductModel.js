const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    imageDetail: [{ type: String, required: true }],
    type: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true }, //So luong con trong kho
    rating: { type: Number, required: true },
    description: { type: String },
    discount: { type: Number },
    selled: { type: Number },
    quality: { type: Number },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }, // Sử dụng reference để liên kết với bảng brands     
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
