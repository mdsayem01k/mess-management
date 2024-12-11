require('dotenv').config()
const mongoose = require('mongoose');

const db_url=process.env.DB_URI
mongoose.connect(db_url, {
  useNewUrlParser: true,  
  useUnifiedTopology: true,  
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error("Connection Error:", err);
});

module.exports = mongoose;
