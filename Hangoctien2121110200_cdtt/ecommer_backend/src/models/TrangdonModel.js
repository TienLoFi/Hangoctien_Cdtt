const mongoose = require('mongoose')

const trangdonSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        detail: { type: String, required: true },
        description: { type: String },
        image: { type: String, required: true },
        type: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);
const Trangdon = mongoose.model('Trangdon', trangdonSchema);

module.exports = Trangdon;
