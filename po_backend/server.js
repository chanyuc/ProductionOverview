const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const productionDataRoutes = require('./routes/productionDataRoutes')
const ProductionData = require('./models/ProductionData');
const router = express.Router();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: "Welcome to the backend server" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/api', productionDataRoutes);

module.exports = router;
