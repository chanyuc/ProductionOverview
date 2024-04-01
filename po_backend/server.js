const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const productionDataRoutes = require('./routes/productionDataRoutes')
const receiveDataRoutes = require('./routes/receiveDataRoutes')
const router = express.Router();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: "Welcome to the backend server" });
});

// (CY): API routes
app.use('/api/prod', productionDataRoutes);
app.use('/api/order', receiveDataRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = router;
