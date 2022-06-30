const _ = require('lodash');
const { RESPONSE_STATUS, ERROR, CONSTANT, LIMIT } = require('./../../../util/constant');
const models = require('./../../../model');
const { checkFields } = require('./../../../util/helper');

module.exports = (req, res, next) => {

    let promises = [];

    // Check fields
    let updateObject = checkFields(_.pick(req.body, ['name', 'surname', 'password', 'email']));

    // Field validation failed
    if (updateObject.error) {
        return next({
            data: updateObject.error,
            message: `User with id: ${req.auth.id} could not update himself/herself.`,
            status: RESPONSE_STATUS.FAIL
        });
    }

    // Email exists
    if (updateObject.email) {
        
        // Check email
        promises.push(models.user.findOne({
                where: { email: updateObject.email },
                paranoid: false
            })
            .then(user => {

                // User already exists
                if(user && !user.deletedAt) {
                    return Promise.reject(ERROR.USER_ALREADY_EXISTS);
                }
                
            }));

    }

    // Watch promises
    return Promise
        .all(promises)
        .then(() => models.user.update(updateObject, {
                where: { id: req.auth.id }
            }
        ))
        .then(() => next({
            data: {},
            message: `User with id: ${req.auth.id} updated himself/herself.`,
            status:RESPONSE_STATUS.SUCCESS
        }))
        .catch(error => next({
            data: error,
            message: `User with id: ${req.auth.id} could not update himself/herself.`,
            status: RESPONSE_STATUS.FAIL
        }));

};

/**
 * @swagger
 * /api/v1/user:
 *   patch:
 *     tags:
 *       - User
 *     description: Patch user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: signUpUser
 *         in: body
 *         schema:
 *           $ref: '#/definitions/signUpUser'
 *     responses:
 *       200:
 *         headers:
 *           x-auth:
 *             schema:
 *               type: string
 *             description: Authentication token
 *         schema:
 *           type: object
 *       400:
 *         description: Code = 1004, 1015, 1016, 3000
 *         schema:
 *           type: object
 *           $ref: '#/definitions/error'
 *       401:
 *         description: Code = 1000
 *         schema:
 *           type: object
 *           $ref: '#/definitions/error'
 *       403:
 *         description: Code = 1011
 *         schema:
 *           type: object
 *           $ref: '#/definitions/error'
 *       500:
 *         description: Code = 4000
 *         schema:
 *           type: object
 *           $ref: '#/definitions/error'
 */