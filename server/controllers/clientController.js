const Client = require('../models/client')

//post method
const CreateClient = async(req, res) => {
    try {
        const {fname , lname, tp, email} = req.body;

        //check if email is already taken
        const emailexist = await Client.findOne({email})
        if (emailexist) {
            return res.json({
                error: 'Email is already taken'
            });
        }

        //checkin if tp is already taken
        const tpexist = await Client.findOne({tp})
        if (tpexist) {
            return res.json({
                error: 'tp is already taken'
            });
        }

        //create database
        const newClient = await Client({
            fname,
            lname,
            tp,
            email
        })

        const newClientItem = await newClient.save();

        res.status(200).json({
            message: 'Client added successfully',
            data: newClientItem
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Internel server error'});
    }
}

module.exports = {
    CreateClient
}