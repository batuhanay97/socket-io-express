const validator = require('validator');
const models = require('../model');
const { authentication } = require('../middleware/authentication');
const bcrypt = require('bcryptjs');
const { CONSTANT, ERROR, LIMIT, REQUEST_STATUS, ENVIRONMENT, SOCKET } = require('./constant');
const passwordValidator = require('password-validator');
const { data } = require('./logger');

const defineRoutes = (routes, routeName, version) => {

    // Define router
    const router = require('express').Router();

    // Create all routes
    routes.forEach((endpoint) => {

        // Set version if endpoint doesn't support
        if (!endpoint.versions.includes(version)) version = endpoint.fallbackVersion;

        // Set handlers
        let handlers = [];
        if (endpoint.authentication) handlers.push(authentication);
        handlers = handlers.concat(endpoint.handlers);

        // Set controller
        router[endpoint.type](endpoint.path, handlers,
            require(`./../controller/${version}/${routeName}/${endpoint.controller}`));

    });

    return router;

};

const userSocketStatus = (type, socket) => {
    
    const userId = socket.decoded.id;

    return models.socketStatus.findOne({ where: { userId } })
        .then(status => {

            if (!status) return models.socketStatus.create({ userId, socketId: socket.id, status: type });
            else return models.socketStatus.update({ status: type, socketId: socket.id }, { where: { id: status.id } });

        })
        .then(() => {
            
            return findFriendsSocketIdsByUserId(userId)

        })
        .then(data => {

            if(data.length !== 0) {
                data.forEach(element => {
                    if (element.socketStatus === SOCKET.ONLINE) socket.broadcast.to(element.socketId).emit(type, type);
                });

            }

            return null;

        })
        .catch(err => console.log(err))


}

const sendMessage = (socket, message) => {

    const userId = socket.decoded.id;
    const unSeenMessage = [];

    return findFriendsSocketIdsByUserId(userId)
        .then(data => {

            data.forEach(element => {

                if (element.socketStatus === SOCKET.ONLINE) socket.broadcast.to(element.socketId).emit(SOCKET.MESSAGE, message);
                else unSeenMessage.push({ userId: element.userId, message })
                
            })
            
            return models.unseenMessage.bulkCreate(unSeenMessage)
        })
        .catch(err => console.log(err))

}

const seeMessage = (socket, messageId) => models.unseenMessage.destroy({ where : { id: messageId }})

const getUnseenMessage = (socket, callback) =>{

    return models.unseenMessage.findAll({ where: { userId: socket.decoded.id } })
        .then(unseenMessages => callback(unseenMessages))

}

const findFriendsSocketIdsByUserId = (userId) => {

    return models.sequelize.query(`
                Select socketId, ss.status as socketStatus, ss.userId from friendrequests as fr
                left join socketstatuses as ss on fr.creatorId = ss.userId or fr.receiverId = ss.userId
                where fr.status = 'accepted' and (fr.receiverId = '${userId}' or fr.creatorId = '${userId}') and ss.userId != '${userId}'
            `, {raw:true,type: models.sequelize.QueryTypes.SELECT})

}

const checkFields = (fields) => {

    let response = {};

    // Name
    if (fields.hasOwnProperty('name')) {
        if (!fields.name || typeof fields.name !== 'string') {
            return { error: ERROR.NAME_MISSING };
        }
        else response.name = fields.name.trim();
    }

    // Surname
    if (fields.hasOwnProperty('surname')) {
        if (!fields.surname || typeof fields.surname !== 'string') {
            return { error: ERROR.SURNAME_MISSING };
        }
        else response.surname = fields.surname.trim();
    }

    // Email
    if (fields.hasOwnProperty('email')) {
        if (!fields.email || typeof fields.email !== 'string' || !validator.isEmail(fields.email.trim())) {
            return { error: ERROR.BADLY_FORMATTED_EMAIL };
        }
        else response.email = fields.email.trim();
    }

    // Password
    if (fields.hasOwnProperty('password')) {
        if (!fields.password || typeof fields.password !== 'string') {
            return { error: ERROR.INVALID_PASSWORD };
        }
        else {

            // Create a schema
            let schema = new passwordValidator();

            // Customize password schema
            schema
                .is().min(LIMIT.MIN_PASSWORD_CHAR_COUNT)
                .is().max(LIMIT.MAX_PASSWORD_CHAR_COUNT)
                .has().lowercase()
                .has().symbols()
                .has().digits();

            // Get validity
            const check = schema.validate(fields.password);

            // Return error if check is not valid
            if (!check) return { error: ERROR.INVALID_PASSWORD };

            response.password = bcrypt.hashSync(fields.password, bcrypt.genSaltSync(CONSTANT.HASH_SALT));
            response.plainPassword = fields.password;

        }
    }

    // Phone
    if (fields.hasOwnProperty('phone')) {
        if (!fields.phone || !validator.isMobilePhone(fields.phone.trim())) {
            return { error: ERROR.PHONE_MISSING };
        }
        else response.phone = fields.phone.trim();
    }

    // Status
    if (fields.hasOwnProperty('status')) {
        if (!fields.status || typeof fields.status !== 'string') {
            return { error: ERROR.STATUS_MISSING };
        }
        else response.status = fields.status.trim();
    }

    // ReceiverId
    if (fields.hasOwnProperty('receiverId')) {
        if (!fields.receiverId || typeof fields.receiverId !== 'string') {
            return { error: ERROR.STATUS_MISSING };
        }
        else response.receiverId = fields.receiverId.trim();
    }

    // Return response
    return response;

};

module.exports = {
    checkFields,
    defineRoutes,
    userSocketStatus,
    sendMessage,
    seeMessage,
    getUnseenMessage
};
