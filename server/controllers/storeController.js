const Store = require('../models/store')

//post method store
const storeitems = async (req, res) => {
    try {
        const {item , ppu, qnt} = req.body;

        //create data base
        const newStore = await Store({
            item,
            ppu,
            qnt
        })

        const newStoreItem = await newStore.save();

        res.status(200).json({
            message: 'Store successfully',
            data: newStoreItem
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Internel server error'});
    }
}

module.exports ={
    storeitems

}