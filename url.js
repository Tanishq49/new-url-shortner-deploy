const { nanoid } = require('nanoid');
const Url = require('../models/url.js');

function formatUrl(url) {
    if (!/^https?:\/\//i.test(url)) {
        return 'http://' + url;
    }
    return url;
}

async function handleGenerateUrl(req, res) {
    try {
        const body = req.body;
        if (!body.redirectURL) {
            return res.status(400).json({
                error: 'Bad Request',
                message: "Please provide a URL",
            });
        }

        // Ensure URL has protocol (http or https)
        const formattedUrl = formatUrl(body.redirectURL);

        const shortURL = nanoid(8);
        await Url.create({
            shortURL: shortURL,
            redirectURL: formattedUrl,
            visitHistory: [],
        });
        res.render('output', { url: shortURL })
    } catch (err) {
        console.error(`Some error occurred: ${err}`);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: "The server encountered an unexpected condition",
        });
    }
}

module.exports = handleGenerateUrl;
