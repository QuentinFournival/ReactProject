const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
    windowMs: 15*60*1000, //15minutes
    max: 1000 // Nombre d'échec de connection
});

module.exports = apiLimiter;