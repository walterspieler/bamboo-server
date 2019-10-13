const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  label: {type: String, unique: true,required: true},
  description: {type: String},
  price: {type: Number},
  picture_url:  {type: String},
  active: { type: Boolean, default: true },
  covered: [String],
});

module.exports = mongoose.model('Product', ProductSchema);