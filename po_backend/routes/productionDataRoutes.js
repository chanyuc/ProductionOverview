const express = require('express');
const router = express.Router();
const sequelize = require('../database');
const { Op } = require('sequelize');
const moment = require('moment');
const ProductionData = require('../models/ProductionData');

// (CY): Query recent 1000 rows of GAP data = approx. 9.5 hours
router.get('/production-data', async (req, res) => {
    try {
        const productionData = await ProductionData.findAll({
            order: [
                ['SaveTime', 'DESC']
            ],
            limit: 1001
        });
        res.json(productionData);
    } catch (error) {
        console.error('Error fetching production data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// (CY): Query recent 100 rows of GAP data = > 1 hour
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

// this one has an issue - avg isn't correct
// (CY): Query the average of GAP data
router.get('/production-data/average', async (req, res) => {
    try {
        const endTime = moment();
        const startTime = moment().subtract(24, 'hours');

        const productionData = await ProductionData.findAll({
            attributes: [
                [sequelize.literal("LineCode"), 'LineCode'],
                [sequelize.literal("SUBSTRING(SaveTime, 9, 2) + ':00'"), 'HourOfDay'],
                [sequelize.fn('AVG', sequelize.col('GAP')), 'AverageGAP']
            ],
            where: {
                SaveTime: {
                    [Op.between]: [startTime.format('YYYY-MM-DD HH:mm:ss'), endTime.format('YYYY-MM-DD HH:mm:ss')]
                }
            },
            group: [
                sequelize.literal("LineCode"),
                sequelize.literal("SUBSTRING(SaveTime, 9, 2)")
            ],
            order: [
                sequelize.literal('LineCode ASC'),
                sequelize.literal('HourOfDay ASC')
            ],
            raw: true
        });
        res.json(productionData);
    } catch (error) {
        console.error('Error fetching production data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;