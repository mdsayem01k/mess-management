require('dotenv').config()

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');  // Corrected the typo

// Import mongoose connection
const db = require('./db');
const userRoute=require('./routers/userapi')

const app = express();  // Add parentheses to call express

app.use(bodyparser.json());
app.use(cors());
app.use('/api/user',userRoute)

app.get('/', (req, res) => {
  res.send("Hello world from server");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Running on: http://localhost:${port}`);
});
