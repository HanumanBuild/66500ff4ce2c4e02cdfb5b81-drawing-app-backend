const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Add the following lines to import the routes
const authRoutes = require('./routes/auth');
const drawingRoutes = require('./routes/drawings');

app.use(cors());
app.use(express.json());

// Add the following lines to use the routes
app.use('/api/auth', authRoutes);
app.use('/api/drawings', drawingRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});