const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ContractSchema = new mongoose.Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subscription_date: { type: Date, default: Date.now },
  beneficiary: { type: String, required: true },
  model: { type: String, required: true },
});

module.exports = mongoose.model('Contract', ContractSchema);