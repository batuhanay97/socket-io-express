const _ = require('lodash');
const { RESPONSE_STATUS, ERROR, CONSTANT, LIMIT } = require('../../../util/constant');
const models = require('../../../model');
const { checkFields } = require('../../../util/helper');

module.exports = (req, res, next) => {

    let promises = [];

    // Check fields
    let updateObject = checkFields(_.pick(req.body, ['status']));

    // Field validation failed
    if (updateObject.error) {
        return next({
            data: updateObject.error,
            message: `Friend request with id: ${req.auth.id} could not update himself/herself.`,
            status: RESPONSE_STATUS.FAIL
        });
    }

    // Check exists
    return models.friendRequest.findOne({
                where: { id: req.params.requestId, receiverId: req.auth.id },
                paranoid: false
        })
        .then(request => {

            if(!request) return Promise.reject(ERROR.FRIEND_REQUEST_NOT_FOUND)

            return models.friendRequest.update(updateObject, {
                where: { id: req.params.requestId }
                }
            )
        
        })
        .then(() => next({
            data: {},
            message: `User with id: ${req.auth.id} updated request`,
            status:RESPONSE_STATUS.SUCCESS
        }))
        .catch(error => next({
            data: error,
            message: `User with id: ${req.auth.id} could not update request`,
            status: RESPONSE_STATUS.FAIL
        }));

};