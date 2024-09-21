const express = require('express')
const router = express.Router();
const cors = require('cors');

const {createBill, getBills, getBillById, deleteBill} = require('../controllers/billController')

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

// Route to create a new bill
router.post('/bills', createBill);

// Route to get all bills
router.get('/bills', getBills);

// Route to get a specific bill by ID
router.get('/bills/:id', getBillById);

// Route to delete a specific bill by ID
router.delete('/bills/:id', deleteBill);

module.exports = router