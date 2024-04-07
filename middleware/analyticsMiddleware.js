const ApiCall = require('../models/apiCall');

function storeApiCall(req, res, next) {
    const { method, url, query, body } = req;

    const apiCall = new ApiCall({
        method,
        url,
        query,
        body,
        timestamp: new Date() // Add a timestamp for when the API call was made
    });

    apiCall.save()
        .then(() => next())
        .catch(err => {
            console.error('Failed to log API call:', err);
            next(err); // Pass the error to the next middleware or error handler
        });
}

module.exports = storeApiCall;
