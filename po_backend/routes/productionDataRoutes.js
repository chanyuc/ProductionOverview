const express = require('express');
const router = express.Router();
const sequelize = require('../database');
const { Op } = require('sequelize');
const moment = require('moment');
const ProductionData = require('../models/ProductionData');

// (CY): Query recent 1000 rows of GAP data and can do the pagination
const DEFAULT_PAGE_SIZE = 1001;
const MAX_PAGE_SIZE = 1001;
const DEFAULT_PAGE_SIZE2 = 91;
const MAX_PAGE_SIZE2 = 91;
function calculateOffset(page, pageSize) {
    return (page - 1) * pageSize;
}

router.get('/production-data/pagination', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        let pageSize = parseInt(req.query.pageSize) || DEFAULT_PAGE_SIZE;
        pageSize = Math.min(pageSize, MAX_PAGE_SIZE);

        const offset = calculateOffset(page, pageSize);
        const productionData = await ProductionData.findAndCountAll({
            order: [['SaveTime', 'DESC']],
            limit: pageSize,
            offset: offset,
        });

        const nextPage = page + 1;

        res.json({
            data: productionData.rows,
            totalItems: productionData.count,
            currentPage: page,
            pageSize: pageSize,
            nextPage: nextPage,
        });
    } catch (error) {
        console.error('Error fetching order data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

async function fetchProductionData(page, pageSize, offset, startTime, endTime) {
    return await ProductionData.findAndCountAll({
        attributes: [
            [sequelize.literal("LineCode"), 'LineCode'],
            [sequelize.literal("SUBSTRING(SaveTime, 0, 5) + '-' + SUBSTRING(SaveTime, 5, 2) + '-' + SUBSTRING(SaveTime, 7, 2) + ' ' + SUBSTRING(SaveTime, 9, 2) + ':00'"), 'DateTime'],
            [sequelize.fn('AVG', sequelize.col('GAP')), 'AverageGAP']
        ],
        group: [
            sequelize.literal("LineCode"),
            sequelize.literal("SUBSTRING(SaveTime, 0, 5) + '-' + SUBSTRING(SaveTime, 5, 2) + '-' + SUBSTRING(SaveTime, 7, 2) + ' ' + SUBSTRING(SaveTime, 9, 2) + ':00'")
        ],
        where: {
            SaveTime: {
                [Op.between]: [startTime.format('YYYYMMDDHHmmss'), endTime.format('YYYYMMDDHHmmss')]
            }
        },
        order: [
            sequelize.literal('LineCode ASC'),
            sequelize.literal('DateTime DESC')
        ],
        limit: pageSize,
        offset: offset,
        raw: true
    });
}

router.get('/production-data/avg/pagination', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        let pageSize = parseInt(req.query.pageSize) || DEFAULT_PAGE_SIZE2;
        pageSize = Math.min(pageSize, MAX_PAGE_SIZE2);
        const offset = calculateOffset(page, pageSize);
        
        const currentTime = moment();
        let endTime = moment();
        let startTime = moment().subtract(12, 'hours');
        let endOffset = 0;
        let startOffset = 12;
        
        if (page > 1) {
            endOffset = (page - 1) * 12;
            startOffset = 12 + endOffset;
            
            endTime = endTime.subtract(endOffset, 'hours');
            startTime = startTime.subtract(startOffset, 'hours');
        }

        console.log('Start Date:', startTime.format('YYYY-MM-DD HH:mm'));
        console.log('End Date:', endTime.format('YYYY-MM-DD HH:mm'));

        const productionData = await fetchProductionData(page, pageSize, offset, startTime, endTime);
        const nextPage = page + 1;

        res.json({ 
            data: productionData.rows,
            currentPage: page,
            pageSize: pageSize,
            nextPage: nextPage,
        });
    } catch (error) {
        console.error('Error fetching production data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

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

// (CY): Query the average of GAP data
router.get('/production-data/average', async (req, res) => {
    try {
        const endTime = moment();
        const startTime = moment().subtract(12, 'hours');

        const productionData = await ProductionData.findAll({
            attributes: [
                [sequelize.literal("LineCode"), 'LineCode'],
                [sequelize.literal("SUBSTRING(SaveTime, 0, 5) + '-' + SUBSTRING(SaveTime, 5, 2) + '-' + SUBSTRING(SaveTime, 7, 2) + ' ' + SUBSTRING(SaveTime, 9, 2) + ':00'"), 'DateTime'],
                [sequelize.fn('AVG', sequelize.col('GAP')), 'AverageGAP']
            ],
            where: {
                SaveTime: {
                    [Op.between]: [startTime.format('YYYYMMDDHHmmss'), endTime.format('YYYYMMDDHHmmss')]
                }
            },
            group: [
                sequelize.literal("LineCode"),
                sequelize.literal("SUBSTRING(SaveTime, 0, 5) + '-' + SUBSTRING(SaveTime, 5, 2) + '-' + SUBSTRING(SaveTime, 7, 2) + ' ' + SUBSTRING(SaveTime, 9, 2) + ':00'")
            ],
            order: [
                sequelize.literal('LineCode ASC'),
                sequelize.literal('DateTime DESC')
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