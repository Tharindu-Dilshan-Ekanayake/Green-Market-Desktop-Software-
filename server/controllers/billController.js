const Bill = require ('../models/bills')
const Client = require('../models/client');

// Controller for creating a new bill
const createBill = async (req, res) => {
  try {
    const { clientId, items } = req.body;

    // Validate that clientInfo and items are provided
    if (!clientId || !items || !items.length) {
      return res.status(400).json({ error: 'Client information and items are required.' });
    }

    // Calculate the total
    const total = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);

    // Create a new bill
    const newBill = new Bill({
      clientId,
      items,
      total,
    });

    // Save the new bill in the database
    const savedBill = await newBill.save();
    res.status(201).json(savedBill);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the bill.' });
  }
};

const getBills = async (req, res) => {
  try {
    const { date } = req.query;

    // Filter bills by date (assuming bill has a `createdAt` field)
    const bills = await Bill.find({
      createdAt: {
        $gte: new Date(`${date}T00:00:00Z`),
        $lte: new Date(`${date}T23:59:59Z`)
      }
    });

    // Find clients who joined on the selected date
    const clients = await Client.find({
      createdAt: {
        $gte: new Date(`${date}T00:00:00Z`),
        $lte: new Date(`${date}T23:59:59Z`)
      }
    });

    res.status(200).json({ bills, clients });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the bills and clients.' });
  }
};

// Controller to get a specific bill by ID
const getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.status(404).json({ error: 'Bill not found.' });
    }
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the bill.' });
  }
};

// Controller to delete a bill by ID
const deleteBill = async (req, res) => {
  try {
    const bill = await Bill.findByIdAndDelete(req.params.id);
    if (!bill) {
      return res.status(404).json({ error: 'Bill not found.' });
    }
    res.status(200).json({ message: 'Bill deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the bill.' });
  }
};

module.exports = {
  createBill,
  getBills,
  getBillById,
  deleteBill,
};
