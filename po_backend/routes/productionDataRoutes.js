const express = require('express');
const router = express.Router();
const ProductionData = require('../models/ProductionData');

// const { Op } = require('sequelize');
// const currentDate = new Date();
// const oneHourAgo = new Date(currentDate.getTime() - (1 * 60 * 60 * 1000));

router.get('/production-data', async (req, res) => {
    try {
        const productionData = await ProductionData.findAll({
            // where: {
            //     SaveTime: {
            //         [Op.gt]: oneHourAgo,
            //     }
            // },
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
            limit: 100
        });
        res.json(productionData);
    } catch (error) {
        console.error('Error fetching recent production data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
