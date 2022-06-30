const moment = require('moment');
const { HEADER, ERROR, EXPIRATION, USER_LOG } = require('../util/constant');
const models = require('../model');
const logger = require('../util/logger');

let authentication = (req, res, next) => {

	let user, promises = [];

	// Get token
	let token = req.header(HEADER.AUTHENTICATION);

	// Token not exists
	if (!token) {
		logger.warn('Authentication failed: Token does not exist');
		const returnObject = { code: ERROR.AUTHENTICATION_FAILED.code, message: ERROR.AUTHENTICATION_FAILED.message[req.language] };
		return res.status(401).send(returnObject);
	}

	// Verify token
	models.userToken.findOne({
			where: { token },
			include: [{
				association: 'user',
				required: true
			}]
		})
		.then(userToken => {

			// Token not found in database
			if (!userToken) {
				logger.warn('Authentication failed for token: ' + token);
				return Promise.reject(ERROR.AUTHENTICATION_FAILED);
			}

			// Set user
			user = userToken.user;

			// Token expired
			if (moment().isAfter(moment(userToken.createdAt).add(EXPIRATION.TOKEN_IN_DATABASE, 'days'))) {

				return models.sequelize.transaction(t => {

					// Create new token
					return models.user.createToken(user.id, t)
						.then(t => token = t);

				});

			}

		})
		.then(() => {

			// Set auth info
			req.auth = user;
			// Set header
			res.setHeader(HEADER.AUTHENTICATION, token);
			// Successful
			return Promise.resolve(next());
		
		})
		// Fail
		.catch(e => {
			logger.warn('Authentication failed. Error: ' + e);
			const returnObject = { code: ERROR.AUTHENTICATION_FAILED.code, message: ERROR.AUTHENTICATION_FAILED.message[req.language] };
			return res.status(401).send(returnObject);
		});

};

// Export
module.exports = { authentication };