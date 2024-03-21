const express = require('express');
const router = express.Router();
const ProductionData = require('../models/ProductionData');

router.get('/production-data', async (req, res) => {
    try {
        const productionData = await ProductionData.findAll({
            order: [
                ['SaveTime', 'DESC']
            ],
            limit: 1000
        });
        res.json(productionData);
    } catch (error) {
        console.error('Error fetching production data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/production-data/recent', async (req, res) => {
    try {
        const productionData = await ProductionData.findAll({
            order: [
                ['SaveTime', 'DESC']
            ],
            limit: 98
        });
        res.json(productionData);
    } catch (error) {
        console.error('Error fetching recent production data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
