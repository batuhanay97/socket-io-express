const jwt = require('jsonwebtoken');
const moment = require('moment');
const _ = require('lodash');
const { CREATION_TYPE, ERROR, RESPONSE_STATUS } = require('./../../util/constant');

module.exports = (Model) => {

    // Create a new token
    Model.createToken = function(userId, transaction) {

        // Models
        const models = require('./../');

        // Create token
        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET).toString();

        // Save token
        return models.userToken.create({ token, userId }, { transaction })
            // Return token
            .then(() => token);

    };

    // Convert to user object
    Model.prototype.toUserObject = function() {

        return _.pick(this.toJSON(), [
            'id', 'email', 'name', 'surname', 'type', 'dealerId', 'canAccessTowTruck',
            'requestSourceId', 'companyId', 'isActive', 'atWork', 'theme', 'towTruckCompanyId'
        ]);

    };

    // Check existence
    Model.checkExistence = function(id, companyId, options) {

        let searchObject = {
            where: { id }
        }

        // Options
        if (options) {
            if (options.include) searchObject.include = options.include;
        }

        return this.findOne(searchObject)
            .then(user => {

                // User not found
                if (!user) return Promise.reject(ERROR.USER_NOT_FOUND);
                // Not in the same company
                if (user.companyId !== companyId) return Promise.reject(ERROR.USER_NOT_IN_YOUR_COMPANY);
                // User type incorrect
                if (options && options.hasOwnProperty('type') && user.type !== options.type) return Promise.reject(ERROR.INCORRECT_USER_TYPE);

                // Return user
                return user;

            });

    }

    // Delete user
    Model.deleteUser = function(models, requestingUserId, userId, transaction) {

        return this.update({
                companyId: null,
                dealerId: null,
                towTruckCompanyId: null,
                requestSourceId: null,
                deletedAt: moment(),
                isTechnicianDenyResponsible: false,
                atWork: false,
                isActive: false
            }, { where: { id: userId }, transaction })
            .then(() => {

                // Log deletion
                return models.creator.create({
                        responsibleId: requestingUserId,
                        userId: userId,
                        type: CREATION_TYPE.DELETE
                    }, { transaction });

            });

    };

    // Update user
    Model.reviveUser = function(models, requestingUserId, userId, updateObject, transaction) {

        let promises = [];

        return models.user.update(updateObject, { where: { id: userId }, paranoid: false, transaction })
            .then(u => {

                // Get updated user
                promises.push(models.user.findByPk(userId, { transaction }));

                // Log creator
                promises.push(models.creator.create({
                        responsibleId: requestingUserId,
                        userId: userId,
                        type: CREATION_TYPE.CREATE
                    }, { transaction }));

                // Watch promises
                return Promise.all(promises);

            })
            // Return user
            .then(resultSet => resultSet[0]);

    };

    // Create user
    Model.createUser = function(models, requestingUserId, user, transaction) {

        let createdUser;

        return models.user.create(user, { transaction })
            .then(u => {

                // Set created user
                createdUser = u;

                // Log creator
                return models.creator.create({
                        responsibleId: requestingUserId,
                        userId: createdUser.id,
                        type: CREATION_TYPE.CREATE
                    }, { transaction });

            })
            .then(() => createdUser);

    }

};
