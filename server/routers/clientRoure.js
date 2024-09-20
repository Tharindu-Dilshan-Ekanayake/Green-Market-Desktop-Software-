const express = require('express')
const router = express.Router();
const cors = require('cors');

const { CreateClient, getClients } = require('../controllers/clientController')
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

router.post('/createclient', CreateClient);
router.get('/getclient',getClients)

module.exports = router