const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const _ = require('lodash');
const uuidv4 = require('uuid/v4');
const models = require('./../../model');
const constants = require('./../../util/constant');

const users = [{
    id: uuidv4(),
    email: 'mehmet@gmail.com',
    passwordPlain: 'password0',
    password: bcrypt.hashSync('password0', bcrypt.genSaltSync(constants.CONSTANT.HASH_SALT)),
    name: 'Mehmet',
    surname: 'Kısa'
}, {
    id: uuidv4(),
    email: 'burak@gmail.com',
    passwordPlain: 'password1',
    password: bcrypt.hashSync('password1', bcrypt.genSaltSync(constants.CONSTANT.HASH_SALT)),
    name: 'Burak',
    surname: 'Ün'
}, {
    id: uuidv4(),
    email: 'batuhan@gmail.com',
    passwordPlain: 'password2',
    password: bcrypt.hashSync('password2', bcrypt.genSaltSync(constants.CONSTANT.HASH_SALT)),
    name: 'Batuhan',
    surname: 'Say'
}, {
    id: uuidv4(),
    email: 'canan@gmail.com',
    passwordPlain: 'password3',
    password: bcrypt.hashSync('password3', bcrypt.genSaltSync(constants.CONSTANT.HASH_SALT)),
    name: 'Canan',
    surname: 'Tek'
}, {
    id: uuidv4(),
    email: 'cem@gmail.com',
    passwordPlain: 'password4',
    password: bcrypt.hashSync('password4', bcrypt.genSaltSync(constants.CONSTANT.HASH_SALT)),
    name: 'Cem',
    surname: 'Poyraz'
}, {
    id: uuidv4(),
    email: 'bilal@gmail.com',
    passwordPlain: 'password5',
    password: bcrypt.hashSync('password5', bcrypt.genSaltSync(constants.CONSTANT.HASH_SALT)),
    name: 'Bilal',
    surname: 'Meşe'
}, {
    id: uuidv4(),
    email: 'hande@gmail.com',
    passwordPlain: 'password6',
    password: bcrypt.hashSync('password6', bcrypt.genSaltSync(constants.CONSTANT.HASH_SALT)),
    name: 'Hande',
    surname: 'Yener'
}, {
    id: uuidv4(),
    email: 'sesil@gmail.com',
    passwordPlain: 'password7',
    password: bcrypt.hashSync('password7', bcrypt.genSaltSync(constants.CONSTANT.HASH_SALT)),
    name: 'Sesil',
    surname: 'Dem'
}, {
    id: uuidv4(),
    email: 'elif@gmail.com',
    passwordPlain: 'password8',
    password: bcrypt.hashSync('password8', bcrypt.genSaltSync(constants.CONSTANT.HASH_SALT)),
    name: 'Elif',
    surname: 'Söz'
}, {
    id: uuidv4(),
    email: 'nese@gmail.com',
    passwordPlain: 'password9',
    password: bcrypt.hashSync('password9', bcrypt.genSaltSync(constants.CONSTANT.HASH_SALT)),
    name: 'Neşe',
    surname: 'Say'
}, {
    id: uuidv4(),
    email: 'mahmut@gmail.com',
    passwordPlain: 'password10',
    password: bcrypt.hashSync('password10', bcrypt.genSaltSync(constants.CONSTANT.HASH_SALT)),
    name: 'Mahmut',
    surname: 'Söz'
}, {
    id: uuidv4(),
    email: 'daglar@gmail.com',
    passwordPlain: 'password11',
    password: bcrypt.hashSync('password11', bcrypt.genSaltSync(constants.CONSTANT.HASH_SALT)),
    name: 'Ahmet',
    surname: 'Daglar'
}, {
    id: uuidv4(),
    email: 'doktor@gmail.com',
    passwordPlain: 'password12',
    password: bcrypt.hashSync('password12', bcrypt.genSaltSync(constants.CONSTANT.HASH_SALT)),
    name: 'Yavuz',
    surname: 'Doktor'
}, {
    id: uuidv4(),
    email: 'serce@gmail.com',
    passwordPlain: 'password13',
    password: bcrypt.hashSync('password13', bcrypt.genSaltSync(constants.CONSTANT.HASH_SALT)),
    name: 'Minik',
    surname: 'Serçe'
}, {
    id: uuidv4(),
    email: 'melek@gmail.com',
    passwordPlain: 'password14',
    password: bcrypt.hashSync('password14', bcrypt.genSaltSync(constants.CONSTANT.HASH_SALT)),
    name: 'Melek',
    surname: 'İçen'
}, {
    id: uuidv4(),
    email: 'cbes@gmail.com',
    passwordPlain: 'password15',
    password: bcrypt.hashSync('password15', bcrypt.genSaltSync(constants.CONSTANT.HASH_SALT)),
    name: 'Can',
    surname: 'Beş'
}, {
    id: uuidv4(),
    email: 'Taner@gmail.com',
    passwordPlain: 'password16',
    password: bcrypt.hashSync('password16', bcrypt.genSaltSync(constants.CONSTANT.HASH_SALT)),
    name: 'Taner',
    surname: 'Tan'
}];

const userTokens = [{
    token: jwt.sign(_.pick(users[0], ['id']), process.env.JWT_SECRET).toString(),
    userId: users[0].id
}, {
    token: jwt.sign(_.pick(users[1], ['id']), process.env.JWT_SECRET).toString(),
    userId: users[1].id
}, {
    token: jwt.sign(_.pick(users[2], ['id']), process.env.JWT_SECRET).toString(),
    userId: users[2].id
}, {
    token: jwt.sign(_.pick(users[3], ['id']), process.env.JWT_SECRET).toString(),
    userId: users[3].id
}, {
    token: jwt.sign(_.pick(users[4], ['id']), process.env.JWT_SECRET).toString(),
    userId: users[4].id
}, {
    token: jwt.sign(_.pick(users[5], ['id']), process.env.JWT_SECRET).toString(),
    userId: users[5].id
}, {
    token: jwt.sign(_.pick(users[6], ['id']), process.env.JWT_SECRET).toString(),
    userId: users[6].id
}, {
    token: jwt.sign(_.pick(users[7], ['id']), process.env.JWT_SECRET).toString(),
    userId: users[7].id
}, {
    token: jwt.sign(_.pick(users[8], ['id']), process.env.JWT_SECRET).toString(),
    userId: users[8].id
}, {
    token: jwt.sign(_.pick(users[9], ['id']), process.env.JWT_SECRET).toString(),
    userId: users[9].id
}, {
    token: jwt.sign(_.pick(users[10], ['id']), process.env.JWT_SECRET).toString(),
    userId: users[10].id
}, {
    token: jwt.sign(_.pick(users[11], ['id']), process.env.JWT_SECRET).toString(),
    userId: users[11].id
}, {
    token: jwt.sign(_.pick(users[12], ['id']), process.env.JWT_SECRET).toString(),
    userId: users[12].id
}, {
    token: jwt.sign(_.pick(users[13], ['id']), process.env.JWT_SECRET).toString(),
    userId: users[13].id
}, {
    token: jwt.sign(_.pick(users[14], ['id']), process.env.JWT_SECRET).toString(),
    userId: users[14].id
}, {
    token: jwt.sign(_.pick(users[15], ['id']), process.env.JWT_SECRET).toString(),
    userId: users[15].id
}, {
    token: jwt.sign(_.pick(users[16], ['id']), process.env.JWT_SECRET).toString(),
    userId: users[16].id
}];

const friendRequests = [
    {
        id: uuidv4(),
        status: constants.REQUEST_STATUS.PENDING,
        creatorId: users[1].id,
        receiverId: users[0].id
    }
]

const populateTables = () => {
    return models.user.bulkCreate(users)
        .then(() => models.userToken.bulkCreate(userTokens))
        .then(() => models.friendRequest.bulkCreate(friendRequests));

};

module.exports = {
    populateTables,
    users,
    userTokens,
    friendRequests
};
