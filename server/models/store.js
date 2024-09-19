const mongoose = require('mongoose');
const storeSchema = new mongoose.Schema({

    item:{
        type: String,
    },
    ppu:{
        type:Number
    },
    qnt:{
        type:Number
    }

},{timestamps: true})
const Store = mongoose.model('store', storeSchema);
module.exports = Store