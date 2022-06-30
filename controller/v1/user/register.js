const { RESPONSE_STATUS, ERROR, USER_TYPE, PROCESS_TYPE, PROCESS } = require('../../../util/constant');
const models = require('../../../model');
const { checkFields } = require('../../../util/helper');
const moment = require('moment');

module.exports = (req, res, next) => {

    let checkObject;

    let { name, surname, password, email } = req.body;

    checkObject = { name, surname, password, email };

    // Get fields
    let createObject = checkFields(checkObject);

    // Field validation failed
    if (createObject.error) {
        return next({
            data: createObject.error,
            message: `User could not be created.`,
            status: RESPONSE_STATUS.FAIL
        });
    }

    // Check email
    return models.user.findOne({ where: { email } })
    .then(user =>{

        // User already exists
        if(user) return Promise.reject(ERROR.USER_ALREADY_EXISTS);

        return models.user.create({ ...createObject })
    })
    // Success
    .then(user => next({
        data: user,
        message: `User created with id: ${user.id}`,
        status: RESPONSE_STATUS.SUCCESS
    }))
    // Fail
    .catch(error => next({
        data: error,
        message: `User could not be created`,
        status: RESPONSE_STATUS.FAIL
    }));

};
