const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const _ = require('lodash');
const uuidv4 = require('uuid/v4');
const models = require('./../../model');
const constants = require('./../../util/constant');
const commonSeed = require('./common.seed');

const users = [{
    id: uuidv4(),
    email: 'hasan@gmail.com',
    passwordPlain: 'password0',
    password: bcrypt.hashSync('password0', bcrypt.genSaltSync(constants.CONSTANT.HASH_SALT)),
    name: 'Hasan',
    surname: 'Yan'
}, {
    id: uuidv4(),
    email: 'can@gmail.com',
    passwordPlain: 'password1',
    password: bcrypt.hashSync('password1', bcrypt.genSaltSync(constants.CONSTANT.HASH_SALT)),
    name: 'Can',
    surname: 'Düz'
}, {
    id: uuidv4(),
    email: 'nazli@gmail.com',
    passwordPlain: 'password2',
    password: bcrypt.hashSync('password2', bcrypt.genSaltSync(constants.CONSTANT.HASH_SALT)),
    name: 'Nazlı',
    surname: 'Can',
    deletedAt: moment()
}, {
    id: uuidv4(),
    email: 'caner@gmail.com',
    passwordPlain: 'password2',
    password: bcrypt.hashSync('password2', bcrypt.genSaltSync(constants.CONSTANT.HASH_SALT)),
    name: 'Caner',
    surname: 'Yaz',
    deletedAt: moment()
}, {
    id: uuidv4(),
    email: 'cinas@gmail.com',
    passwordPlain: 'password3',
    password: bcrypt.hashSync('password3', bcrypt.genSaltSync(constants.CONSTANT.HASH_SALT)),
    name: 'Cinas',
    surname: 'Yaz'
}];

const userTokens = [{
    token: jwt.sign(_.pick(users[0], ['id']), process.env.JWT_SECRET).toString(),
    userId: users[0].id,
    createdAt: moment().subtract(constants.EXPIRATION.TOKEN_IN_DATABASE + 1, 'days')
}, {
    token: jwt.sign(_.pick(users[2], ['id']), process.env.JWT_SECRET).toString(),
    userId: users[2].id
}, {
    token: jwt.sign(_.pick(users[3], ['id']), process.env.JWT_SECRET).toString(),
    userId: users[3].id
}, {
    token: jwt.sign(_.pick(users[4], ['id']), process.env.JWT_SECRET).toString(),
    userId: users[4].id
}];

const populateTables = (done) => {
    models.user.bulkCreate(users)
        .then(() => models.userToken.bulkCreate(userTokens))
        .then(() => done());
};

module.exports = {
    populateTables,
    users,
    userTokens
};