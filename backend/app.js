require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const petRoutes = require('./routes/petRoutes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/pets', petRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Virtual Pet Adoption Center API' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;