// Function to generate a short key
function generateShortKey(counter) {
    return counter.toString(36); // Converts the number to a base36 string
}

// Function to ensure the URL starts with a valid scheme (https or http)
function ensureValidScheme(url) {
    const schemeRegex = /^https?:\/\//i;
    return schemeRegex.test(url) ? url : 'https://' + url;
}

function normalizeUrl(url) {
    return url.replace(/^https?:\/\//, '');
}

module.exports = { generateShortKey, ensureValidScheme, normalizeUrl };
