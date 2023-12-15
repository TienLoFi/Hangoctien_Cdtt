const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    countInstock: { type: Number, required: true },
    rating: { type: Number, required: true }, // Change "require" to "required"
    description: { type: String },
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;