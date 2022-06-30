const models = require('./../../model');

const resetDb = () => {
    return Promise.resolve()
        .then(() => models.userToken.destroy({ where: {}, force: true }))
        .then(() => models.friendRequest.destroy({ where: {}, force: true }))
        .then(() => models.user.destroy({ where: {}, force: true }))
};

module.exports = {
    resetDb
};
