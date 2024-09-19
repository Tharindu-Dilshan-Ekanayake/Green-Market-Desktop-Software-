const express = require('express')
const router = express.Router();
const cors = require('cors');

const { storeitems } = require('../controllers/storeController')

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

router.post('/storecreate', storeitems)


module.exports = router