const bcrypt = require('bcryptjs');
const { RESPONSE_STATUS, ERROR, HEADER, USER_LOG } = require('./../../../util/constant');
const models = require('./../../../model');

module.exports = (req, res, next) => {

    let user, promises = [];

    // Find user
    return models.user.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(u => {

            // Set user
            user = u;

            // User not found
            if (!user) return Promise.reject(ERROR.USER_NOT_FOUND);

            // Incorrect credentials
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return Promise.reject(ERROR.INCORRECT_CREDENTIALS);
            }
            // Correct credentials
            else {

                return models.sequelize.transaction(t => {

                    // Create new token
                    return models.user.createToken(user.id, t)

                });

            }

        })
		// Success
        .then(resultSet => next({
			data: user.toUserObject(),
			headers: { [HEADER.AUTHENTICATION]: resultSet },
            message: `Successful login by id: ${user.id}`,
            status: RESPONSE_STATUS.SUCCESS
		}))
		// Fail
        .catch(error => next({
			data: error,
            message: `Login failed by the user with email: ${req.body.email}.`,
			status: RESPONSE_STATUS.FAIL
		}));

};

/**
 * @swagger
 * definition:
 *   login:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *     example: {
 *       "email": "dummyemail@test.com",
 *       "password": "dummy-password0",
 *     }
 */

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     tags:
 *       - User
 *     description: Login
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: login
 *         in: body
 *         schema:
 *           $ref: '#/definitions/login'
 *     responses:
 *       200:
 *         headers:
 *           x-auth:
 *             schema:
 *               type: string
 *             description: Authentication token
 *         schema:
 *           type: object
 *           $ref: '#/definitions/user'
 *       400:
 *         description: Code = 1007, 1008, 3000
 *         schema:
 *           type: object
 *           $ref: '#/definitions/error'
 *       401:
 *         description: Code = 1000
 *         schema:
 *           type: object
 *           $ref: '#/definitions/error'
 *       500:
 *         description: Code = 4000
 *         schema:
 *           type: object
 *           $ref: '#/definitions/error'
 */