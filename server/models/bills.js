const mongoose = require('mongoose');

// Define the item schema for the items on the bill
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

// Define the main Bill schema
const billSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true // Client info can be phone number, email, or name
  },
  items: [itemSchema], // Array of items (subdocuments)
  total: {
    type: Number,
    required: true // Total amount of the bill
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create and export the Bill model
const Bill = mongoose.model('Bill', billSchema);
module.exports = Bill;
