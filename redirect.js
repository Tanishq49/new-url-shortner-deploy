const express = require('express');
const Url = require('../models/url.js');

const router = express.Router();

router.get('/id/:shortID', async (req, res) => {
    try {
        const shortID = req.params.shortID;
        const entry = await Url.findOneAndUpdate(
            { shortURL: shortID },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            },
        );
        if (!entry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }
        // Redirect to the correctly formatted URL
        res.redirect(entry.redirectURL);
    } catch (err) {
        console.log(`Error during redirection: ${err}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;