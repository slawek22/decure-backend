const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const userRoutes = require('./routes/user');
const scenarioRoutes = require('./routes/scenario');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Mongo error:', err));

app.use('/api/user', userRoutes);
app.use('/api/scenario', scenarioRoutes);

app.get('/', (req, res) => res.send('Decure Backend Running'));
app.listen(3001, () => console.log('Server running on port 3001'));
