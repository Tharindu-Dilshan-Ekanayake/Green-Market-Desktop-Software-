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

/// Get method to fetch all clients
const getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

//delete client
const deleteclient = async (req, res) => {
    try {
        const clientId = req.params.clientId;

        // Delete the client from the database
        const deletedClient = await Client.findByIdAndDelete(clientId);

        if (!deletedClient) {
            return res.status(404).json({ error: 'Client not found' });
        }

        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
        console.error('Error deleting client:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//u[date client

const updateclient = async (req, res) => {
    const clientId = req.params.clientId;
    const {fname, lname, tp, email} = req.body;

    try {
        // Find and update the client
        const updatedClient = await Client.findByIdAndUpdate(
            clientId,
            { fname, lname, tp, email },
            { new: true, runValidators: true } // Return the updated document and run validation
        );

        if (!updatedClient) {
            return res.status(404).json({
                error: 'Client not found'
            });
        }

        return res.status(200).json({
            message: 'Client updated successfully',
            data: updatedClient
        });
    } catch (error) {
        console.error('Error updating client:', error);
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
}


module.exports = {
    CreateClient,
    getClients,
    deleteclient,
    updateclient
}