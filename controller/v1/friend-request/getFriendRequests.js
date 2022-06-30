const bcrypt = require('bcryptjs');
const { RESPONSE_STATUS, ERROR, HEADER, USER_LOG } = require('../../../util/constant');
const models = require('../../../model');

module.exports = (req, res, next) => {

    return models.friendRequest.findAll({ where: { receiverId: req.auth.id } })
		// Success
        .then(friendRequest => next({
			data: friendRequest,
            message: `Successful login by id: ${req.auth.id}`,
            status: RESPONSE_STATUS.SUCCESS
		}))
		// Fail
        .catch(error => next({
			data: error,
            message: `Get data failed ${req.auth.id}.`,
			status: RESPONSE_STATUS.FAIL
		}));

};