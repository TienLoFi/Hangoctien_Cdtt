const mongoose = require("mongoose");


const productSchema = new mongoose.Schema(
  {
    
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    imageDetail: [{ type: String, required: true }],
    type: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    description: { type: String },
    discount: { type: Number },
    selled: { type: Number },
    quality: { type: Number },
    brand: { type: String, required: true },
    


    // // Reference to the Brand model
    // brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
 
    // // Reference to the Category model
    // category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
