const { AVAILABLE_VERSIONS, HEADER, ENVIRONMENT, TIMEOUT, SOCKET, EXPIRATION, CONSTANT } = require('./util/constant');

// Get environment configuration if not in production
if (process.env.NODE_ENV !== ENVIRONMENT.PRODUCTION) require('./config/config.js');
// Connect to db
require('./db/connectDb');
// Init helper functions
require('./util/helper');

const express = require('express');
const bodyParser = require('body-parser');
const boolParser = require('express-query-boolean');
const helmet = require('helmet');
const cors = require('cors');
const initializeSwagger = require('./util/swagger');
const models = require('./model');
const routes = require('./route');
const { expressResult } = require('./middleware/expressResult');
const middlewareDefaults = require('./middleware/defaults');
const socketManager = require('./util/socketManager');
const socket = require('socket.io');
const redis = require('socket.io-redis');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT;

// App middleware
app.use(cors({
    exposedHeaders: [Object.values(HEADER)]
}));
app.enable("trust proxy");
app.use(helmet());
app.use(bodyParser.json());
app.use(boolParser());

// Initialize swagger
initializeSwagger(app);

// Middleware defaults
app.use(middlewareDefaults);

// Define routes
Object.keys(routes).forEach(key => {
    // Versioning
    AVAILABLE_VERSIONS.forEach(version => {
        app.use(`/api/${version}/` + key, routes[key](version));
    });
});

// Result handler
app.use(expressResult);

// Sync db
models.sequelize.sync({ alter: true /* force: true */ });

// Start server
const server = app.listen(port, () => {
    console.log(`App started on port ${port}`);
});

const io = socket(server);
io.adapter(redis({ host: process.env.REDIS_HOST, post: 6379 }));

io
    .use((socket, next) => {

        if(socket.handshake.query && socket.handshake.query.token) {

            return jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return socket.disconnect()
                } else {
                    socket.decoded = decoded
                    return next()
                }

                })
        }

    })
    .on(SOCKET.CONNECTION, socketManager);

// Set timeout for all requests
server.setTimeout(TIMEOUT.REQUEST);

// Export for testing
module.exports = { app };