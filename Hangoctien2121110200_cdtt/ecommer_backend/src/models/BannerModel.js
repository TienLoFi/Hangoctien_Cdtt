const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },

    logo: { type: String , type: String, required: true},
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;