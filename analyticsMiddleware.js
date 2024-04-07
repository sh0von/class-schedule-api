// analyticsMiddleware.js

const fs = require('fs');

function analyticsMiddleware(req, res, next) {
    const { method, url, query, body } = req;
    const timestamp = new Date().toISOString();

    const logEntry = {
        timestamp,
        method,
        url,
        query,
        body
    };

    // Log the analytics data to a file
    fs.appendFile('api-analytics.log', JSON.stringify(logEntry) + '\n', (err) => {
        if (err) {
            console.error('Failed to log API analytics:', err);
        }
    });

    next();
}

module.exports = analyticsMiddleware;
