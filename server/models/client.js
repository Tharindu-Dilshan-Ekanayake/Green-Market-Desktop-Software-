const mongoose = require('mongoose');
const clientSchema = new mongoose.Schema({
    fname:{
        type: String,
    },
    lname:{
        type: String,
    },
    tp:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    }
},{timestamps: true})
const Client = mongoose.model('client', clientSchema);
module.exports = Client;