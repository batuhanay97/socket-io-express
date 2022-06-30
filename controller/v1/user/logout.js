const bcrypt = require('bcryptjs');
const { RESPONSE_STATUS, ERROR, HEADER } = require('./../../../util/constant');
const models = require('./../../../model');

module.exports = (req, res, next) => {
    
    let user = req.auth;
    let promises = [];
    
    // Get token
    let token = req.header(HEADER.AUTHENTICATION);
    
    return models.sequelize.transaction(t => {
    
        // Delete token
       return models.userToken.destroy({
                where : { token }, transaction: t
            })
        
    })
    // Success
    .then(resultSet => next({
        data: {},
        message: `Successful logout by id: ${user.id}`,
        status: RESPONSE_STATUS.SUCCESS
    }))
    // Fail
    .catch(error => next({
        data: error,
        message: `Logout failed by the user with id: ${user.id}.`,
        status: RESPONSE_STATUS.FAIL
    }));

}

/**
 * @swagger
 * /api/v1/user/logout:
 *   post:
 *     tags:
 *       - User
 *     description: Logout
 *     produces:
 *       - application/json
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
 *         description: Code = 3000
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