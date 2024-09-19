const express = require('express')
const router = express.Router();
const cors = require('cors');

const { CreateClient } = require('../controllers/clientController')
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

router.post('/createclient', CreateClient)

module.exports = router