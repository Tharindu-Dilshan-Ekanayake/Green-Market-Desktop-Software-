const Store = require('../models/store');

// Function to generate random item number (two letters and three numbers)
const generateItemNo = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetters = letters.charAt(Math.floor(Math.random() * letters.length)) +
                          letters.charAt(Math.floor(Math.random() * letters.length));

    const randomNumbers = Math.floor(100 + Math.random() * 900); // Ensures 3-digit number

    return randomLetters + randomNumbers;
};

// Function to ensure the itemno is unique
const generateUniqueItemNo = async () => {
    let isUnique = false;
    let itemno;

    while (!isUnique) {
        itemno = generateItemNo();
        // Check if the itemno already exists in the database
        const existingItem = await Store.findOne({ itemno });
        if (!existingItem) {
            isUnique = true;
        }
    }

    return itemno;
};

// POST method store
const storeitems = async (req, res) => {
    try {
        const { item, ppu, qnt } = req.body;

        // Generate a unique item number
        const itemno = await generateUniqueItemNo();

        // Create data in the database
        const newStore = new Store({
            item,
            itemno,
            ppu,
            qnt
        });

        const newStoreItem = await newStore.save();

        res.status(200).json({
            message: 'Store item created successfully',
            data: newStoreItem
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

//get method
const getStore = async (req, res) =>{
    try {
        const stores = await Store.find();
        res.status(200).json(stores);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

//delete storeitem
const deletestore = async (req, res)=>{
    try {
        const storeId = req.params.storeId;

        // Delete the client from the database
        const deletedstore = await Store.findByIdAndDelete(storeId);

        if (!deletedstore) {
            return res.status(404).json({ error: 'Client not found' });
        }

        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
        
    }
}

// PUT method to update store item
const updateStore = async (req, res) => {
    try {
        const storeId = req.params.storeId;
        const { item, ppu, qnt } = req.body;

        // Find the store item by ID and update it with the new values
        const updatedStore = await Store.findByIdAndUpdate(storeId, {
            item,
            ppu,
            qnt
        }, { new: true });

        if (!updatedStore) {
            return res.status(404).json({ error: 'Store item not found' });
        }

        res.status(200).json({
            message: 'Store item updated successfully',
            data: updatedStore
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = {
    storeitems,
    getStore,
    deletestore,
    updateStore
};
