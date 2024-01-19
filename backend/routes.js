const express = require('express');
const { generateShortKey, ensureValidScheme, normalizeUrl } = require('./util');

const router = express.Router();
let urlDatabase = {};
let counter = 0;

router.post('/', (req, res) => {
    const requestedUrl = req.body.url;
    if (!requestedUrl) {
        return res.status(400).json({ error: 'Missing field: url' });
    }

    // Normalize the URL for storage and comparison
    const normalizedUrl = normalizeUrl(requestedUrl);

    // Check if normalized URL already exists in the database
    let existingKey = Object.keys(urlDatabase).find((key) => urlDatabase[key] === normalizedUrl);
    if (existingKey) {
        return res.json({ key: existingKey, long_url: normalizedUrl, short_url: `http://localhost:8080/${existingKey}` });
    }

    // Generate a short key for the new URL
    const shortKey = generateShortKey(counter++);
    urlDatabase[shortKey] = normalizedUrl;

    res.json({ key: shortKey, long_url: normalizedUrl, short_url: `http://localhost:8080/${shortKey}` });
});

router.get('/database', (req, res) => {
    res.json(urlDatabase);
});

router.get('/:shortKey', (req, res) => {
    const normalizedUrl = urlDatabase[req.params.shortKey];
    if (normalizedUrl) {
        const fullUrl = ensureValidScheme(normalizedUrl);
        res.redirect(fullUrl);
    } else {
        res.status(404).send('URL not found');
    }
});

module.exports = router;
