require('dotenv').config(); // Add this at the top of your file

const express = require('express');
const mongoose = require('mongoose');

const app = express();
console.log("MongoDB URL:", process.env.REACT_APP_MONGO_URL); // Debug line to check if the URL is correctly

mongoose
  .connect(process.env.REACT_APP_MONGO_URL)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Database not connected', err));

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.use('/',require('./routers/clientRoure'))
app.use('/store',require('./routers/storeRoute'))
app.use('/bill', require('./routers/billRouter'))

const port = 8000;

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
