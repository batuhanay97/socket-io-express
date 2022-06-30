const { RESPONSE_STATUS, ERROR, USER_TYPE, PROCESS_TYPE, PROCESS, REQUEST_STATUS } = require('../../../util/constant');
const models = require('../../../model');
const { checkFields } = require('../../../util/helper');
const moment = require('moment');

module.exports = (req, res, next) => {

    let checkObject;

    let { receiverId } = req.body;

    checkObject = { receiverId };

    // Get fields
    let createObject = checkFields(checkObject);

    // Field validation failed
    if (createObject.error) {
        return next({
            data: createObject.error,
            message: `Friend request could not be created.`,
            status: RESPONSE_STATUS.FAIL
        });
    }

    // Check exists
    return models.friendRequest.findOne({ where: { [models.Op.or]: [ {creatorId: req.auth.id, receiverId }, { creatorId: receiverId, receiverId: req.auth.id } ] } })
    .then(user =>{

        // request already exists
        if(user) return Promise.reject(ERROR.REQUEST_ALREADY_EXISTS);

        if(req.auth.id === receiverId) return Promise.reject(ERROR.CAN_NOT_REQUEST);

        return models.friendRequest.create({ ...createObject, creatorId: req.auth.id, status: REQUEST_STATUS.PENDING })
    })
    // Success
    .then(friendRequest => next({
        data: friendRequest,
        message: `friendRequest created with id: ${friendRequest.id} by id: ${req.auth.id}`,
        status: RESPONSE_STATUS.SUCCESS
    }))
    // Fail
    .catch(error => next({
        data: error,
        message: `friendRequest could not be created by the user with id: ${req.auth.id}.`,
        status: RESPONSE_STATUS.FAIL
    }));

};
