const shortid = require('shortid');
// const { nanoid } =require('nanoid')
const Url = require('../models/url');

async function handleCreateShortUrl(req, res) {
    const { redirectURL } = req.body;
    if (!redirectURL) {
        return res.status(400).json({ error: 'Redirect URL is required' });
    }

    try {
        
        // const shortId = nanoid(); // Generate a unique short ID
        const shortId = shortid.generate();
        const newUrl = new Url({
            shortId,
            redirectURL,
            visitHistory: [],
            createdBy: req.user ? req.user._id : null 
        });

        await newUrl.save();
        res.status(201).json({ shortId, redirectURL });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create short URL' });
    }
}

async function handleGetShortUrl(req, res) {
    const { shortId } = req.params;

    try {
        const url = await Url.findOne({ shortId });
        if (!url) {
            return res.status(404).json({ error: 'Short URL not found' });
        }
        // Update visit history
        url.visitHistory.push({ timestamp: Date.now() });
        await url.save();
        // Redirect to the original URL
        res
            .status(302)
            .redirect(url.redirectURL);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve URL' });
    }
}

async function handleGetAnalytics(req, res) {
    const { shortId } = req.params;

    try {
        const url = await Url.findOne({ shortId });
        if (!url) {
            return res.status(404).json({ error: 'Short URL not found' });
        }   
        // Return total clicks and visit history
        const totalClicks = url.visitHistory.length;
        res.status(200).json({
            shortId: url.shortId,
            redirectURL: url.redirectURL,
            totalClicks,
            visitHistory: url.visitHistory
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve analytics' });
    }
}


module.exports = {
    handleCreateShortUrl,
    handleGetShortUrl,
    handleGetAnalytics
};