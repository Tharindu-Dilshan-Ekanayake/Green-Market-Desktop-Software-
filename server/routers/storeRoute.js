const express = require('express')
const router = express.Router();
const cors = require('cors');

const { storeitems, getStore, deletestore, updateStore } = require('../controllers/storeController')

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

router.post('/storecreate', storeitems);
router.get('/storeget',getStore);
router.delete('/deletestore/:storeId', deletestore);
router.put('/updateStore/:storeId',updateStore)


module.exports = router