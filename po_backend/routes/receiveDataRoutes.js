const express = require('express');
const router = express.Router();
const ReceiveData = require('../models/ReceiveData');

router.get('/receive-data', async (req, res) => {
    try {
        const receiveData = await ReceiveData.findAll({
            order: [
                ['CarDate', 'DESC']
            ],
            limit: 1001
        });
        res.json(receiveData);
    } catch (error) {
        console.error('Error fetching production data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/receive-data/recent', async (req, res) => {
    try {
        const receiveData = await ReceiveData.findAll({
            order: [
                ['CarDate', 'DESC']
            ],
            limit: 98
        });
        res.json(receiveData);
    } catch (error) {
        console.error('Error fetching recent production data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;